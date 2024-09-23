import { Box, Modal, ModalProps } from "@mui/material";

interface ModalDefaultProps extends ModalProps {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ModalDefault({ 
  open, 
  onClose, 
  children, 
  ...rest 
}: ModalDefaultProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      {...rest}
    >
      <Box sx={{ ...style }}>
        {children}
      </Box>
    </Modal>
  )
}