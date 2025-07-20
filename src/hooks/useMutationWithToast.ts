import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useToast } from './useToast';

interface MutationWithToastOptions<TData, TError, TVariables> 
  extends Omit<UseMutationOptions<TData, TError, TVariables>, 'onError' | 'onSuccess'> {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
}

export const useMutationWithToast = <TData, TError, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationWithToastOptions<TData, TError, TVariables> = {}
) => {
  const toast = useToast();
  
  const {
    successMessage,
    errorMessage,
    onSuccess: customOnSuccess,
    onError: customOnError,
    ...restOptions
  } = options;

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Show success message if provided
      if (successMessage) {
        toast.success(successMessage);
      }
      
      // Call custom onSuccess if provided
      if (customOnSuccess) {
        customOnSuccess(data, variables);
      }
    },
    onError: (error, variables) => {
      // Use custom error message or extract from response
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        const apiError = error as { response?: { data?: { message?: string } } };
        const errorMsg = apiError.response?.data?.message || 'An unexpected error occurred';
        toast.error(errorMsg);
      }
      
      // Call custom onError if provided
      if (customOnError) {
        customOnError(error, variables);
      }
    },
    ...restOptions,
  });
}; 