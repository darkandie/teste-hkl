import { Typography } from "@mui/material";

interface TextRegularProps {
  children: string;
  color: string;
  size: number;
}

export default function TextRegular({ children, color, size }: TextRegularProps) {
  return (
    <Typography 
      color={color ? color : 'black'}
      fontWeight={400}
      fontSize={size ? size : 16}
    >{children}</Typography>
  )
}