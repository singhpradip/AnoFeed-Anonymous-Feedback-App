import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Box } from "../components/base";
import {
  AuthFormField,
  AuthSubmitButton,
  AuthFormContainer,
} from "../components/molecules";
import { useAuth } from "../hooks/useAuth";
import { registerSchema, type RegisterFormData } from "../schemas";

export const Register = () => {
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

    const { register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register(data);
      navigate("/dashboard", { replace: true });
    } catch {
      // Error is handled by useAuth with toast notifications
    }
  };

  return (
    <AuthFormContainer
      isAuthenticated={isAuthenticated}
      onSubmit={registerForm.handleSubmit(handleRegister)}
    >
        <AuthFormField
          name="name"
          control={registerForm.control}
          label="Full Name"
          disabled={isLoading}
          errors={registerForm.formState.errors}
        />

        <AuthFormField
          name="email"
          control={registerForm.control}
          label="Email"
          type="email"
          disabled={isLoading}
          errors={registerForm.formState.errors}
        />

        <Box display="flex" gap={2}>
          <AuthFormField
            name="role"
            control={registerForm.control}
            label="Role (optional)"
            disabled={isLoading}
            errors={registerForm.formState.errors}
          />
          <AuthFormField
            name="department"
            control={registerForm.control}
            label="Department (optional)"
            disabled={isLoading}
            errors={registerForm.formState.errors}
          />
        </Box>

        <AuthFormField
          name="password"
          control={registerForm.control}
          label="Password"
          type="password"
          disabled={isLoading}
          errors={registerForm.formState.errors}
        />

        <AuthSubmitButton
          isLoading={isLoading}
          disabled={!registerForm.formState.isValid}
        >
          REGISTER
        </AuthSubmitButton>
    </AuthFormContainer>
  );
};
