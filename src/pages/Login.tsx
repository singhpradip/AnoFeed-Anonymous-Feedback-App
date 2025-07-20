import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography } from "../components/base";
import {
  AuthFormField,
  AuthSubmitButton,
  AuthFormContainer,
} from "../components/molecules";
import { primary, custom1, action } from "../assets/colors";
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
    <AuthFormContainer
      isAuthenticated={isAuthenticated}
      onSubmit={loginForm.handleSubmit(handleLogin)}
    >
      <AuthFormField
        name="email"
        control={loginForm.control}
        label="Email"
        type="email"
        disabled={isLoading}
        errors={loginForm.formState.errors}
      />

      <AuthFormField
        name="password"
        control={loginForm.control}
        label="Password"
        type="password"
        disabled={isLoading}
        errors={loginForm.formState.errors}
      />

      <AuthSubmitButton
        isLoading={isLoading}
        disabled={!loginForm.formState.isValid}
      >
        LOGIN
      </AuthSubmitButton>

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
    </AuthFormContainer>
  );
};
