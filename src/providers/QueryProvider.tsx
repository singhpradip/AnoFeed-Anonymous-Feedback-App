import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from "react-toastify";
import { CONFIG } from "../config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (
        failureCount,
        error: Error & { response?: { status: number } }
      ) => {
        // Don't retry on 401/403 errors
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        // Global error handling for mutations that don't have their own onError
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
        const errorMessage =
          apiError.response?.data?.message || "An unexpected error occurred";

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });

        console.error("Global mutation error:", error);
      },
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {CONFIG.ENABLE_DEV_TOOLS && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}; 