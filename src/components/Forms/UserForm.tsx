import { Box, FormControl, TextField } from "@mui/material";
import TextBold from "../ui/TextBold";
import ButtonDefault from "../ui/Button";
import SaveIcon from '@mui/icons-material/Save';

export default function UserForm() {
  return(
    <Box  
      display={'flex'}
      flexDirection={'column'}
    >
      <TextBold alignSelf={"center"} size={24} mb={2}>Formulário de cadastro de usuário</TextBold>
      <FormControl>
        <TextBold m={1}>Dados pessoais</TextBold>
        <TextField 
          label={"Nome"}
          placeholder="Insira seu nome"
          margin="normal"
          size="small"
        />
        <TextField 
          label={"E-mail"}
          placeholder="teste@teste.com.br"
          margin="normal"
           size="small"
        />
        <Box
          display={"flex"}
          gap={2}
        >
          <TextField 
            label={"CPF"}
            placeholder="000.000.000-00"
            margin="normal"
            size="small"
          />
          <TextField 
            label={"Telefone"}
            placeholder="(99) 99999-9999"
            margin="normal"
            size="small"
          />
        </Box>
        <TextBold m={1}>Endereço</TextBold>
        <Box
          display={"flex"}
          gap={2}
        >
          <TextField 
            label={"CEP"}
            placeholder="00000-000"
            margin="normal"
            size="small"
          />
          <TextField 
            label={"Número"}
            placeholder="000"
            margin="normal"
            size="small"
          />
        </Box>
        <TextField 
          label={"Rua"}
          placeholder="Ex: Alameda Juscelino Kubstcheck"
          margin="normal"
           size="small"
        />
        <TextField 
          label={"Bairro"}
          placeholder="Ex: Estrela"
          margin="normal"
          size="small"
        />
        <Box
          display={"flex"}
          gap={2}
          mb={2}
        >
          <TextField 
            label={"Cidade"}
            placeholder="Ex: São Paulo"
            margin="normal"
            size="small"
          />
          <TextField 
            label={"Estado"}
            placeholder="Ex: São Paulo"
            margin="normal"
            size="small"
          />
        </Box>
        <ButtonDefault 
          title="Cadastrar"
          endIcon={<SaveIcon />}
        />
      </FormControl>
    </Box>
  )
}