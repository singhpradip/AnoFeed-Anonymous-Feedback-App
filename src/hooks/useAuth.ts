import { useQueryClient } from "@tanstack/react-query";
import {
  useLoginMutation,
  useLogoutMutation,
  useUserProfileQuery,
} from "../api";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { decodeJWT, isTokenExpired } from "../utils";
import { useToast } from "./useToast";
import type { LoginData, RegisterData, User } from "../types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Check if user has valid token
  const getStoredToken = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (!token) return null;

    const tokenData = decodeJWT(token);
    if (isTokenExpired(tokenData)) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      return null;
    }
    return token;
  };

  const isAuthenticated = !!getStoredToken();

  // Fetch user profile if authenticated
  const {
    data: userResponse,
    isLoading: isUserLoading,
    error: userError,
  } = useUserProfileQuery({
    enabled: isAuthenticated,
  });

  const user: User | null = userResponse?.data || null;

  // Login mutation
  const loginMutation = useLoginMutation({
    onSuccess: (response) => {
      if (response.data) {
        const { user: userData, token } = response.data;

        // Store tokens
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));

        // Invalidate and refetch all queries
        queryClient.invalidateQueries();

        // Show success message
        toast.success("Successfully logged in!");
      }
    },
    onError: (error) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      const errorMsg =
        apiError.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
      logout();
    },
  });

  // Logout mutation
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      toast.success("Successfully logged out!");
    },
    onError: (error) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      const errorMsg = apiError.response?.data?.message || "Logout failed";
      toast.error(errorMsg);
    },
    onSettled: () => {
      logout();
    },
  });

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    const loginData: LoginData = { email, password };
    await loginMutation.mutateAsync(loginData);
  };

  // Register function (placeholder for now)
  const register = async (userData: RegisterData): Promise<void> => {
    // TODO: Implement register mutation
    console.log("Register:", userData);
  };

  // Logout function
  const logout = (): void => {
    // Clear localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TENANT);

    // Clear all React Query cache
    queryClient.clear();
  };

  const isLoading =
    loginMutation.isPending || logoutMutation.isPending || isUserLoading;

  return {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
    // Additional useful states from React Query
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    userError,
  };
};
