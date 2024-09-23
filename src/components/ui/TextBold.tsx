import { Typography, TypographyProps } from "@mui/material";

interface TextBoldProps extends TypographyProps {
  children: string;
  color?: string;
  size?: number;
}

export default function TextBold({ children, color, size, ...rest }: TextBoldProps) {
  return (
    <Typography 
      color={color ? color : 'black'}
      fontWeight={700}
      fontSize={size ? size : 16}
      {...rest}
    >{children}</Typography>
  )
}