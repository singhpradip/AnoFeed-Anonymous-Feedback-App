interface EnvironmentConfig {
  API_BASE_URL: string;
  APP_NAME: string;
  APP_VERSION: string;
  ENABLE_DEV_TOOLS: boolean;
  ENABLE_ANALYTICS: boolean;
  FEEDBACK_EDIT_TIMEOUT: number;
}

const getEnvVar = (name: string, defaultValue?: string): string => {
  const value = import.meta.env[name];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable ${name} is required but not defined`);
  }
  return value;
};

const getBooleanEnvVar = (name: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[name];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
};

const getNumberEnvVar = (name: string, defaultValue: number): number => {
  const value = import.meta.env[name];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const CONFIG: EnvironmentConfig = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL'),
  APP_NAME: getEnvVar('VITE_APP_NAME', 'AnoFeed'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION'),
  ENABLE_DEV_TOOLS: getBooleanEnvVar('VITE_ENABLE_DEV_TOOLS', true),
  ENABLE_ANALYTICS: getBooleanEnvVar('VITE_ENABLE_ANALYTICS', false),
  FEEDBACK_EDIT_TIMEOUT: getNumberEnvVar('VITE_FEEDBACK_EDIT_TIMEOUT', 300000), // 5 minutes
};

// Development mode check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// Environment mode
export const NODE_ENV = import.meta.env.MODE || 'development';

// Validate critical environment variables on app start
export const validateEnvironment = (): void => {
  const requiredVars = ['VITE_API_BASE_URL'];
  
  for (const varName of requiredVars) {
    if (!import.meta.env[varName]) {
      console.error(`⚠️  Missing required environment variable: ${varName}`);
    }
  }
  
  if (isDevelopment) {
    console.log('🔧 Environment Variables:', {
      ...CONFIG,
      NODE_ENV,
      isDevelopment,
      isProduction,
    });
  }
}; 