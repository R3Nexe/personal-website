// Comprehensive error logging utility
// This file provides centralized error logging functionality across the application

/**
 * Creates a standardized error logging function for a specific context
 * @param {string} context - The context/component where the error occurred
 * @param {string} emoji - Emoji to identify the error type in console
 * @returns {Function} Error logging function
 */
export const createErrorLogger = (context, emoji = '🚨') => {
  return (errorContext, error, additionalInfo = {}) => {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      context,
      errorContext,
      error: error.message || error,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...additionalInfo
    };

    console.error(`${emoji} ${context.toUpperCase()} ERROR [${errorContext}]:`, errorInfo);

    // In production, you might want to send this to an error tracking service
    // Example: sendToErrorTracking(errorInfo);

    return errorInfo;
  };
};

/**
 * Common error logging functions for different contexts
 */
export const logSupabaseError = createErrorLogger('supabase', '🚨');
export const logStorageError = createErrorLogger('storage', '📁');
export const logVideoError = createErrorLogger('video', '🎥');
export const logProjectsError = createErrorLogger('projects', '📁');
export const logAboutError = createErrorLogger('about', '👤');
export const logCardError = createErrorLogger('card', '🃏');
export const logButtonError = createErrorLogger('button', '🔘');
export const logAppError = createErrorLogger('app', '⚛️');

/**
 * Global error handler for unhandled errors
 */
export const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logAppError('UNHANDLED_PROMISE_REJECTION', event.reason, {
      severity: 'CRITICAL',
      impact: 'Application may become unstable',
      promise: event.promise,
      solution: 'Add proper error handling to async operations'
    });
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    logAppError('UNCAUGHT_ERROR', event.error, {
      severity: 'CRITICAL',
      impact: 'Application may crash',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      solution: 'Add try-catch blocks around risky operations'
    });
  });

  console.log('✅ Global error handling setup complete');
};

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

/**
 * Common error types
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  RENDER: 'RENDER_ERROR',
  DATA: 'DATA_ERROR',
  CONFIG: 'CONFIG_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR'
};

/**
 * Utility function to check if an error is recoverable
 */
export const isRecoverableError = (error) => {
  const recoverablePatterns = [
    /network/i,
    /timeout/i,
    /connection/i,
    /fetch/i
  ];

  return recoverablePatterns.some(pattern =>
    pattern.test(error.message || error.toString())
  );
};

/**
 * Utility function to get user-friendly error messages
 */
export const getUserFriendlyMessage = (error, context) => {
  const errorMessage = error.message || error.toString();

  const friendlyMessages = {
    'Network Error': 'Please check your internet connection and try again.',
    'Failed to fetch': 'Unable to connect to the server. Please try again later.',
    'Timeout': 'The request is taking too long. Please try again.',
    'Permission denied': 'You don\'t have permission to perform this action.',
    'Not found': 'The requested resource was not found.',
    'Server error': 'Something went wrong on our end. Please try again later.'
  };

  // Try to match error message with friendly messages
  for (const [key, message] of Object.entries(friendlyMessages)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      return message;
    }
  }

  // Default message based on context
  const contextMessages = {
    'supabase': 'There was an issue with the database connection.',
    'storage': 'Unable to load the requested file.',
    'video': 'Unable to load the background video.',
    'projects': 'Unable to load project information.',
    'about': 'Unable to load profile information.'
  };

  return contextMessages[context] || 'Something went wrong. Please try again.';
};

/**
 * Performance monitoring for error-prone operations
 */
export const withPerformanceMonitoring = (operation, context) => {
  return async (...args) => {
    const startTime = performance.now();

    try {
      const result = await operation(...args);
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`✅ ${context} operation completed in ${duration.toFixed(2)}ms`);

      if (duration > 5000) { // Log slow operations
        logAppError('SLOW_OPERATION', new Error(`Operation took ${duration.toFixed(2)}ms`), {
          severity: ERROR_SEVERITY.MEDIUM,
          impact: 'User experience may be affected',
          duration,
          context,
          solution: 'Consider optimizing the operation or adding loading states'
        });
      }

      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      logAppError('OPERATION_FAILED', error, {
        severity: ERROR_SEVERITY.HIGH,
        impact: 'Operation failed',
        duration,
        context,
        solution: 'Check operation implementation and error handling'
      });

      throw error;
    }
  };
};
