import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import TextBold from '../ui/TextBold';
import ButtonDefault from '../ui/Button';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { useApi } from '@/hooks/useApi';
import { useAppContext } from '@/context/AppContext';

interface DeleteBannerProps {
  closeModal: () => void;
}

export default function DeleteBanner({ closeModal }: DeleteBannerProps) {
  const { deleteUser } = useApi();
  const { user } = useAppContext();

  const query = useQueryClient()

  const { mutate } = useMutation({
    //@ts-expect-error @ts-expect-error
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso.");
      query.invalidateQueries(["users"])
      closeModal();
    },
    onError: () => {
      return toast.error("Erro ao deletar usuário.")
    }
  })

  const handleDeleteUser = () => {
    if(user) {
      mutate(user.id!)
    }
  }

  return(
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
      <WarningAmberIcon fontSize='large' color='error'/>
      <TextBold textAlign={"center"} width={"70%"} fontSize={20}>Tem certeza que deseja deletar esse usuário?</TextBold>
      <Box display={"flex"} justifyContent={"space-between"} gap={2}>
        <ButtonDefault 
          title='Cancelar'
          color='error'
          endIcon={<ClearIcon />}
          fullWidth
          onClick={closeModal}
        />
        <ButtonDefault 
          title='Continuar'
          fullWidth
          endIcon={<DeleteIcon />}
          onClick={handleDeleteUser}
        />
      </Box>
    </Box>
  )
}