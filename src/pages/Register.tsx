import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button,
  CircularProgress,
} from '../components/base';
import { AuthLayout } from '../components/organisms/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, type RegisterFormData } from '../schemas';

export const Register = () => {
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });
  
  const { register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register(data);
      navigate('/dashboard', { replace: true });
    } catch {
      // Error is handled by useAuth with toast notifications
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={registerForm.handleSubmit(handleRegister)}>
        <Controller
          name="name"
          control={registerForm.control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Full Name"
              margin="normal"
              error={Boolean(registerForm.formState.errors.name)}
              helperText={registerForm.formState.errors.name?.message}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="email"
          control={registerForm.control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              margin="normal"
              error={Boolean(registerForm.formState.errors.email)}
              helperText={registerForm.formState.errors.email?.message}
              disabled={isLoading}
            />
          )}
        />
        <Box display="flex" gap={2}>
          <Controller
            name="role"
            control={registerForm.control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Role (optional)"
                margin="normal"
                disabled={isLoading}
              />
            )}
          />
          <Controller
            name="department"
            control={registerForm.control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Department (optional)"
                margin="normal"
                disabled={isLoading}
              />
            )}
          />
        </Box>
        <Controller
          name="password"
          control={registerForm.control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              error={Boolean(registerForm.formState.errors.password)}
              helperText={registerForm.formState.errors.password?.message}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={registerForm.control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              error={Boolean(registerForm.formState.errors.confirmPassword)}
              helperText={registerForm.formState.errors.confirmPassword?.message}
              disabled={isLoading}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'REGISTER'}
        </Button>
      </form>
    </AuthLayout>
  );
}; 