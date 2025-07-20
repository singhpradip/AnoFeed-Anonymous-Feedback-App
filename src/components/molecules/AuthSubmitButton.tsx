import { Button, CircularProgress } from '../base';

interface AuthSubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function AuthSubmitButton({
  children,
  isLoading = false,
  disabled = false,
  type = 'submit',
}: AuthSubmitButtonProps) {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      size="large"
      disabled={isLoading || disabled}
      sx={{
        mt: 3,
        mb: 2,
        height: '48px',
        borderRadius: '8px',
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 600,
      }}
    >
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
} 