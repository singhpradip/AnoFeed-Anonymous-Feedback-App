import axios from 'axios';
import type { AxiosRequestHeaders } from 'axios';
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from '../constants';
import { globalHeaders } from '../utils/globalHeaders';
import { decodeJWT, isTokenExpired } from '../utils/jwt';
import type { JWTPayload } from '../utils/jwt';

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}

export const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

API.interceptors.request.use(
  async (config) => {
    const headers = await globalHeaders(true);
    config.headers = { ...headers } as AxiosRequestHeaders;
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    
    // Check if refresh token is invalid
    if (err.response?.data?.error?.is_refresh_invalid) {
      // Clear all tokens and redirect to login
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      window.location.assign('/login');
      return Promise.reject(err);
    }
    
    // Check if access token is invalid and we haven't already retried
    if (
      (err.response?.status === 401 || 
       err.response?.data?.error?.is_access_invalid === 'True') &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      
      try {
        const tokenData = decodeJWT();
        
        // Only attempt refresh if token is expired
        if (isTokenExpired(tokenData)) {
          const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH);
          
          if (!refreshToken) {
            // No refresh token available, redirect to login
            localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
            window.location.assign('/login');
            return Promise.reject(err);
          }
          
          // Attempt to refresh the token
          const response = await axios.post<RefreshTokenResponse>(
            `${API_BASE_URL}/auth/refresh`,
            {
              refresh: refreshToken,
              'tenant-id': localStorage.getItem(LOCAL_STORAGE_KEYS.TENANT),
            }
          );
          
          const { access } = response.data;
          
          // Store the new access token
          localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, access);
          
          // Update the original request headers
          originalConfig.headers.Authorization = `Bearer ${access}`;
          
          // Retry the original request
          return API(originalConfig);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect
        localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
        window.location.assign('/login');
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(err);
  },
); 