import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Error logging utility
const logError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo
  };

  console.error(`🚨 SUPABASE ERROR [${context}]:`, errorInfo);

  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, or your own logging endpoint
};

// Validate environment variables
if (!supabaseUrl) {
  logError('ENVIRONMENT_VALIDATION', new Error('Missing VITE_SUPABASE_URL'), {
    severity: 'CRITICAL',
    impact: 'Supabase client will not function properly',
    solution: 'Add VITE_SUPABASE_URL to your .env file'
  });
}

if (!supabaseKey) {
  logError('ENVIRONMENT_VALIDATION', new Error('Missing VITE_SUPABASE_ANON_KEY'), {
    severity: 'CRITICAL',
    impact: 'Supabase client will not function properly',
    solution: 'Add VITE_SUPABASE_ANON_KEY to your .env file'
  });
}

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized successfully');
} catch (error) {
  logError('CLIENT_INITIALIZATION', error, {
    severity: 'CRITICAL',
    impact: 'Application cannot connect to Supabase',
    supabaseUrl: supabaseUrl ? 'Present' : 'Missing',
    supabaseKey: supabaseKey ? 'Present' : 'Missing',
    solution: 'Check your Supabase credentials and network connection'
  });

  // Create a fallback client to prevent app crashes
  supabase = createClient('https://fallback.supabase.co', 'fallback-key');
}

export { supabase };
