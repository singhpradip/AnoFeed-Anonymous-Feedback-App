import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "../components/base";
import { primary, custom1, action } from "../assets/colors";
import { AuthLayout } from "../components/organisms/AuthLayout";
import { useAuth } from "../hooks";
import { loginSchema, type LoginFormData } from "../schemas";

export const Login = () => {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch {
      // Error is handled by useAuth with toast notifications
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={loginForm.handleSubmit(handleLogin)}>
        <Controller
          name="email"
          control={loginForm.control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              margin="normal"
              error={Boolean(loginForm.formState.errors.email)}
              helperText={loginForm.formState.errors.email?.message}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="password"
          control={loginForm.control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              error={Boolean(loginForm.formState.errors.password)}
              helperText={loginForm.formState.errors.password?.message}
              disabled={isLoading}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          size="large"
          disabled={isLoading || !loginForm.formState.isValid}
        >
          {isLoading ? <CircularProgress size={24} /> : "LOGIN"}
        </Button>
      </form>

      <Box
        sx={{
          mt: 3,
          p: 4,
          background: `linear-gradient(135deg, ${custom1.background} 0%, ${primary.background} 100%)`,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Modern geometric background elements */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            background: primary.main,
            opacity: 0.15,
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -10,
            left: -10,
            width: 60,
            height: 60,
            background: primary.main,
            opacity: 0.12,
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "10%",
            width: 4,
            height: 40,
            background: primary.main,
            opacity: 0.25,
            borderRadius: 2,
            transform: "rotate(45deg)",
          }}
        />

        {/* Main content */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: primary.main,
              fontWeight: 600,
              textAlign: "center",
              mb: 1,
              textShadow: `0 1px 2px ${action.disabled}`,
            }}
          >
            ✨ Your appreciation inspires,
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: primary.main,
              fontWeight: 600,
              textAlign: "center",
              mb: 2,
              textShadow: `0 1px 2px ${action.disabled}`,
            }}
          >
            Your feedback improves ✨
          </Typography>

          {/* Modern accent line */}
          <Box
            sx={{
              width: 60,
              height: 3,
              background: primary.main,
              opacity: 0.6,
              borderRadius: 2,
              mx: "auto",
              mt: 2,
            }}
          />
        </Box>
      </Box>
    </AuthLayout>
  );
};
