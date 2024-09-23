"use client";

import { useQuery } from "react-query";
import { useApi } from "@/hooks/useApi";
import { Box } from "@mui/material";
import { User } from "@/types/user";
import DataGridDefault from "@/components/DataGrid";
import ButtonDefault from "@/components/ui/Button";
import AddIcon from '@mui/icons-material/Add';
import TextBold from "@/components/ui/TextBold";
import { useState } from "react";
import ModalDefault from "@/components/Modal";
import UserForm from "@/components/Forms/UserForm";

export default function Home() {
  const { getAllUser } = useApi();
  const [open, setOpen] = useState(false)
  
  const {data, isLoading} = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getAllUser
  })

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  if(isLoading) return <h1>Loading...</h1>;

  return (
    <Box 
      display={'flex'} 
      alignItems={'center'} 
      justifyContent={'center'}
      height={'100vh'}
      flexDirection={'column'}
      bgcolor={"whitesmoke"}
    >
      <Box 
        display={"flex"} 
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        maxWidth={1200}
        width={"100%"}
        marginBottom={5}
      >
        <TextBold size={20}>Lista de usuários</TextBold>
        <ButtonDefault onClick={handleOpen} title="Adicionar usuário" endIcon={<AddIcon />}/>
      </Box>
      <Box maxWidth={'1200px'} width={"100%"}>
        {data && <DataGridDefault rows={data}/>}
      </Box>
      <ModalDefault 
        open={open}
        onClose={handleClose}
      >
        <UserForm />
      </ModalDefault>
    </Box>
  );
}
