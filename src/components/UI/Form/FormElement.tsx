import { ChangeEvent } from "react";
import { TextField, Grid } from "@mui/material";

interface FormElementProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  error?: string;
  type?: string;
  multiline?: boolean;
  maxLength?: number;
}

const FormElement = ({
  error,
  label,
  multiline,
  name,
  onChange,
  required,
  type,
  value,
  maxLength,
}: FormElementProps) => {
  return (
    <Grid item xs={12}>
      <TextField
        sx={{ width: '100%' }}
        margin="normal"
        id={name}
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={name}
        multiline={multiline}
        error={!!error}
        helperText={error}
        required={required}
        type={type}
        inputProps={{ maxLength }}
      />
    </Grid>
  );
};

export default FormElement;
