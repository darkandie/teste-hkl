import { Typography } from "@mui/material";

interface TextBoldProps {
  children: string;
  color?: string;
  size?: number;
}

export default function TextBold({ children, color, size }: TextBoldProps) {
  return (
    <Typography 
      color={color ? color : 'black'}
      fontWeight={700}
      fontSize={size ? size : 16}
    >{children}</Typography>
  )
}