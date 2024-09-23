import { Button, ButtonProps } from "@mui/material";

interface ButtonDefaultProps extends ButtonProps {
  title: string;
  variant?: "text" | "contained" | "outlined";
  endIcon?: React.ReactNode;
}

export default function ButtonDefault({ 
  title, 
  variant,
  endIcon,
  ...rest
}: ButtonDefaultProps) {
  return(
    <Button
      variant={variant ? variant : "contained"}
      endIcon={endIcon ? endIcon : null}
      {...rest}
    >
      {title}
    </Button>
  )
}