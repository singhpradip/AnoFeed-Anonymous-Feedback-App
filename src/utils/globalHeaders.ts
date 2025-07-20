import { LOCAL_STORAGE_KEYS } from '../constants';

export interface GlobalHeaders {
  'Content-Type': string;
  Authorization?: string;
  'tenant-id'?: string;
}

export const globalHeaders = async (includeAuth: boolean = true): Promise<GlobalHeaders> => {
  const headers: GlobalHeaders = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const tenantId = localStorage.getItem(LOCAL_STORAGE_KEYS.TENANT);
    if (tenantId) {
      headers['tenant-id'] = tenantId;
    }
  }

  return headers;
}; 