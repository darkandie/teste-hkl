import { Button } from "@mui/material";

interface ButtonDefaultProps {
  title: string;
  variant?: "text" | "contained" | "outlined";
  endIcon?: React.ReactNode;
}

export default function ButtonDefault({ 
  title, 
  variant,
  endIcon
}: ButtonDefaultProps) {
  return(
    <Button
      variant={variant ? variant : "contained"}
      endIcon={endIcon ? endIcon : null}
    >
      {title}
    </Button>
  )
}