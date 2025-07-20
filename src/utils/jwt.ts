export interface JWTPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  email?: string;
  userId?: string;
  role?: string;
  tenantId?: string;
}

export const decodeJWT = (token?: string): JWTPayload | null => {
  try {
    const tokenToUse = token || localStorage.getItem('authToken');
    if (!tokenToUse) return null;

    const base64Url = tokenToUse.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const isTokenExpired = (tokenData?: JWTPayload | null): boolean => {
  if (!tokenData) return true;
  const exp = tokenData.exp;
  return typeof exp === 'number' && new Date(exp * 1000) < new Date();
}; 