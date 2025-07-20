import { useToast } from './useToast';

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
      errors?: Record<string, string[]>;
    };
    status?: number;
  };
  message?: string;
}

interface UseErrorHandlerOptions {
  defaultMessage?: string;
  showValidationErrors?: boolean;
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
  const {
    defaultMessage = 'An unexpected error occurred. Please try again.',
    showValidationErrors = true,
  } = options;

  const toast = useToast();

  const handleError = (error: unknown): void => {
    const apiError = error as ApiError;
    
    // Extract error message from different possible locations
    const extractErrorMessage = (): string => {
      // Check for specific error message
      if (apiError.response?.data?.message) {
        return apiError.response.data.message;
      }
      
      // Check for general error
      if (apiError.response?.data?.error) {
        return apiError.response.data.error;
      }
      
      // Check for validation errors
      if (showValidationErrors && apiError.response?.data?.errors) {
        const validationErrors = apiError.response.data.errors;
        const firstError = Object.values(validationErrors)[0];
        if (firstError && firstError.length > 0) {
          return firstError[0];
        }
      }
      
      // Check for basic error message
      if (apiError.message) {
        return apiError.message;
      }
      
      // Check status codes for specific messages
      if (apiError.response?.status) {
        switch (apiError.response.status) {
          case 401:
            return 'Authentication failed. Please log in again.';
          case 403:
            return 'You do not have permission to perform this action.';
          case 404:
            return 'The requested resource was not found.';
          case 422:
            return 'Invalid data provided. Please check your input.';
          case 429:
            return 'Too many requests. Please try again later.';
          case 500:
            return 'Server error. Please try again later.';
          case 503:
            return 'Service temporarily unavailable. Please try again later.';
          default:
            return defaultMessage;
        }
      }
      
      return defaultMessage;
    };

    const errorMessage = extractErrorMessage();
    
    // Show error toast
    toast.error(errorMessage);
    
    // Log error for debugging
    console.error('Error handled by useErrorHandler:', error);
  };

  const handleSuccess = (message: string): void => {
    toast.success(message);
  };

  const handleInfo = (message: string): void => {
    toast.info(message);
  };

  const handleWarning = (message: string): void => {
    toast.warning(message);
  };

  return {
    handleError,
    handleSuccess,
    handleInfo,
    handleWarning,
  };
}; 