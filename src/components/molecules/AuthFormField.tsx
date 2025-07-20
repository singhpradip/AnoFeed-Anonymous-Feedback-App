import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path, FieldErrors } from 'react-hook-form';
import { TextField } from '../base';

interface AuthFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  errors?: FieldErrors<T>;
  defaultValue?: string;
}

export function AuthFormField<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  disabled = false,
  errors = {},
  defaultValue = '',
}: AuthFormFieldProps<T>) {
  const fieldError = errors[name];
  const errorMessage = fieldError?.message;
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as T[Path<T>]}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          type={type}
          margin="normal"
          error={Boolean(fieldError)}
          helperText={typeof errorMessage === 'string' ? errorMessage : undefined}
          disabled={disabled}
        />
      )}
    />
  );
} 