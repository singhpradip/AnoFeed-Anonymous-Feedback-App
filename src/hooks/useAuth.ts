import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api';
import { LoginData, RegisterData, User } from '../../types';

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.success && data.data) {
        localStorage.setItem('authToken', data.data.token);
        queryClient.setQueryData(['auth', 'user'], data.data.user);
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      }
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      if (data.success && data.data) {
        localStorage.setItem('authToken', data.data.token);
        queryClient.setQueryData(['auth', 'user'], data.data.user);
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem('authToken');
      queryClient.clear();
    },
    onError: () => {
      // Even if the API call fails, we should clear local storage
      localStorage.removeItem('authToken');
      queryClient.clear();
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: async () => {
      const response = await authApi.getProfile();
      return response.data;
    },
    enabled: !!localStorage.getItem('authToken'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      if (data.success && data.data) {
        queryClient.setQueryData(['auth', 'profile'], data.data);
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      }
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
  });
}; 
 