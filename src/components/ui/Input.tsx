import { TextField, TextFieldProps } from "@mui/material";

type InputDefaultProps = {
  
} & TextFieldProps;

export default function InputDefault({ error, ...rest }: InputDefaultProps) {
  return (
    <TextField 
      error={error}
      {...rest}
    />
  )
}