import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLoginMutation, useLogoutMutation, useUserProfileQuery } from '../api';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { decodeJWT, isTokenExpired } from '../utils';
import { AuthContext } from './AuthContext';
import type { AuthContextType, User, LoginData } from '../types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check if user is authenticated based on token
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (!token) return false;
    
    const tokenData = decodeJWT(token);
    return !isTokenExpired(tokenData);
  });

  // Fetch user profile if authenticated
  const { data: profileData, isLoading: isProfileLoading } = useUserProfileQuery({
    enabled: isAuthenticated,
  });

  // Login mutation
  const loginMutation = useLoginMutation({
    onSuccess: (response) => {
      if (response.data) {
        const { user: userData, token } = response.data;
        
        // Store tokens
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        // Invalidate and refetch queries
        queryClient.invalidateQueries();
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
      logout();
    },
  });

  // Logout mutation
  const logoutMutation = useLogoutMutation({
    onSettled: () => {
      // Always clear local state regardless of server response
      logout();
    },
  });

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    const loginData: LoginData = { email, password };
    await loginMutation.mutateAsync(loginData);
  };

  // Register function (will be implemented when we add register mutation)
  const register = async (userData: unknown): Promise<void> => {
    // TODO: Implement register mutation
    console.log('Register:', userData);
  };

  // Logout function
  const logout = (): void => {
    // Clear localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TENANT);
    
    // Clear state
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear all queries
    queryClient.clear();
  };

  // Initialize user data on mount
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      
      if (token && storedUser) {
        const tokenData = decodeJWT(token);
        
        if (!isTokenExpired(tokenData)) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Failed to parse stored user data:', error);
            logout();
          }
        } else {
          logout();
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Update user when profile data changes
  useEffect(() => {
    if (profileData?.data) {
      setUser(profileData.data);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(profileData.data));
    }
  }, [profileData]);

  // Update loading state
  useEffect(() => {
    setIsLoading(loginMutation.isPending || logoutMutation.isPending || isProfileLoading);
  }, [loginMutation.isPending, logoutMutation.isPending, isProfileLoading]);

  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 