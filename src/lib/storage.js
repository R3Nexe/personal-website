// src/lib/storage.js
import { supabase } from "./supabaseClient";

// Error logging utility for storage operations
const logStorageError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo
  };

  console.error(`📁 STORAGE ERROR [${context}]:`, errorInfo);
};

export function publicUrl(path) {
  // Input validation
  if (!path || typeof path !== 'string') {
    logStorageError('INVALID_PATH', new Error('Path must be a non-empty string'), {
      severity: 'HIGH',
      impact: 'Cannot generate public URL',
      providedPath: path,
      pathType: typeof path,
      solution: 'Ensure path is a valid string (e.g., "icons/github.svg")'
    });
    return null;
  }

  // Check if path starts with expected prefixes
  const validPrefixes = ['icons/', 'photos/', 'videos/', 'resume/'];
  const hasValidPrefix = validPrefixes.some(prefix => path.startsWith(prefix));

  if (!hasValidPrefix) {
    logStorageError('INVALID_PATH_PREFIX', new Error('Path does not start with valid prefix'), {
      severity: 'MEDIUM',
      impact: 'File may not be found in expected storage bucket',
      providedPath: path,
      validPrefixes,
      solution: 'Ensure path starts with one of: icons/, photos/, videos/, or resume/'
    });
  }

  try {
    const { data, error } = supabase.storage.from("assets").getPublicUrl(path);

    if (error) {
      logStorageError('SUPABASE_STORAGE_ERROR', error, {
        severity: 'HIGH',
        impact: 'Cannot access file from storage',
        path,
        bucket: 'assets',
        errorCode: error.code,
        errorMessage: error.message,
        solution: 'Check if file exists in Supabase storage bucket and verify permissions'
      });
      return null;
    }

    // Validate the returned URL
    if (!data?.publicUrl) {
      logStorageError('INVALID_RESPONSE', new Error('No public URL returned from Supabase'), {
        severity: 'HIGH',
        impact: 'Cannot display file',
        path,
        responseData: data,
        solution: 'Check Supabase storage configuration and file existence'
      });
      return null;
    }

    // Check if URL is properly formatted
    try {
      new URL(data.publicUrl);
    } catch (urlError) {
      logStorageError('INVALID_URL_FORMAT', urlError, {
        severity: 'HIGH',
        impact: 'Generated URL is malformed',
        path,
        generatedUrl: data.publicUrl,
        solution: 'Check Supabase storage configuration'
      });
      return null;
    }

    console.log(`✅ Public URL generated successfully for "${path}" → ${data.publicUrl}`);
    return data.publicUrl;

  } catch (error) {
    logStorageError('UNEXPECTED_ERROR', error, {
      severity: 'CRITICAL',
      impact: 'Storage operation failed completely',
      path,
      solution: 'Check Supabase client initialization and network connectivity'
    });
    return null;
  }
}
