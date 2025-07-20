import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthLayout } from '../organisms/AuthLayout';

interface AuthFormContainerProps {
  children: ReactNode;
  isAuthenticated: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthFormContainer({
  children,
  isAuthenticated,
  onSubmit,
}: AuthFormContainerProps) {
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </AuthLayout>
  );
} 