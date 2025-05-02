import { TextField } from "@mui/material";

export default function InputField({
  name,
  label,
  value,
  onChange,
  multiline = false,
}) {
  return (
    <TextField
      name={name}
      label={label}
      variant="standard"
      value={value}
      onChange={onChange}
      multiline={multiline}
      fullWidth
      required
      style={{ minHeight: "56px", marginBottom: "16px" }}
      minRows={multiline ? 3 : undefined}
    />
  );
}
