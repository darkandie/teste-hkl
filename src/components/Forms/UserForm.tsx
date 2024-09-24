import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";
import TextBold from "../ui/TextBold";
import ButtonDefault from "../ui/Button";
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateCPF } from "@/shared/functions/validateCPF";
import { validateCEP } from "@/shared/functions/validateCEP";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import { useMutation, useQueryClient } from "react-query";
import { useApi } from "@/hooks/useApi";
import toast from 'react-hot-toast';
import { useEffect } from "react";
import { states } from "@/shared/statesList";
import TextRegular from "../ui/TextRegular";
import { useAppContext } from "@/context/AppContext";

const userSchema = z.object({
  name: z.string().nonempty("Este campo é obrigatório!"),
  email: z.string().email("Email inválido").nonempty("Este campo é obrigatório!"),
  cpf: z.string()
    .nonempty("Este campo é obrigatório!")
    .refine(validateCPF, { message: "CPF inválido" })
    .refine((value) => cpfValidator.isValid(value), {
      message: 'CPF inválido',
    }),
  telephone: z.string().nonempty("Este campo é obrigatório!"),
  address: z.object({
    cep: z.string()
      .nonempty("Este campo é obrigatório!")
      .refine(validateCEP, { message: "CEP inválido" }),
    street: z.string().nonempty("Este campo é obrigatório!"),
    city: z.string().nonempty("Este campo é obrigatório!"),
    number: z.string().nonempty("Este campo é obrigatório!"),
    state: z.string().nonempty("Este campo é obrigatório!"),
    neighborhood: z.string().nonempty("Este campo é obrigatório!")
  })
});

type UserSchema = z.infer<typeof userSchema>;

interface UserFormProps {
  closeModal: () => void;
}

export default function UserForm({ closeModal }: UserFormProps) {
  const { createNewUser, updateUser } = useApi();
  const query = useQueryClient();

  const { user } = useAppContext();

  const { setValue, watch, register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
    resolver: zodResolver(userSchema)
  });

  useEffect(() => {
    if(user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("cpf", user.cpf);
      setValue("telephone", user.telephone);
      setValue("address.cep", user.address.cep);
      setValue("address.city", user.address.city);
      setValue("address.neighborhood", user.address.neighborhood);
      setValue("address.number", user.address.number);
      setValue("address.state", user.address.state);
      setValue("address.street", user.address.street);
    }
  }, [])

  const state = watch("address.state");

  console.log(state, 'state alal')

  const { mutate: createMutate } = useMutation({
    //@ts-expect-error @ts-expect-error
    mutationFn: createNewUser,
    onSuccess: () => {
      toast.success("Usuário adicionado com sucesso.");
      query.invalidateQueries(["users"])
      closeModal();
    },
    onError: () => {
      return toast.error("Erro ao adicionar novo usuário.")
    }
  })

  const { mutate: editMutate } = useMutation({
    //@ts-expect-error @ts-expect-error
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Usuário alterado com sucesso.");
      query.invalidateQueries(["users"])
      closeModal();
    },
    onError: () => {
      return toast.error("Erro ao alterar usuário.")
    }
  })
  
  const handleSubmitUser = (data: UserSchema) => {
    if(!user) {
      createMutate(data);
    } else {
      editMutate({...data, id: user.id})
    }
  }
  
  return(
    <Box  
      display={'flex'}
      flexDirection={'column'}
    >
      <TextBold 
        alignSelf={"center"} 
        size={24} 
        mb={2}
      >{!user ? "Cadastro de usuário" : "Edição de usuário"}</TextBold>
      <form onSubmit={handleSubmit(handleSubmitUser)}>
        <FormControl >
          <TextBold m={1}>Dados pessoais</TextBold>
          <TextField 
            label={"Nome"}
            placeholder="Insira seu nome"
            margin="normal"
            size="small"
            {...register("name")}
            error={!!errors?.name}
            helperText={errors.name?.message}
          />
          <TextField 
            label={"E-mail"}
            placeholder="teste@teste.com.br"
            margin="normal"
            size="small"
            {...register("email")}
            error={!!errors?.email}
            helperText={errors.email?.message}
          />
          <Box
            display={"flex"}
            gap={2}
          >
            <InputMask mask="999.999.999-99" {...register("cpf")}>
              {/* @ts-expect-error @ts-expect-error*/}
              {() => (
                <TextField 
                  label={"CPF"}
                  placeholder="000.000.000-00"
                  margin="normal"
                  size="small"
                  error={!!errors?.cpf}
                  helperText={errors.cpf?.message}
                  {...register("cpf")}
                />
              )}
            </InputMask>
            <InputMask mask="(99) 99999-9999" {...register("telephone")}>
              {/* @ts-expect-error @ts-expect-error*/}
              {() => (
                <TextField 
                  label={"Telefone"}
                  placeholder="(99) 99999-9999"
                  margin="normal"
                  size="small"
                  error={!!errors?.telephone}
                  helperText={errors.telephone?.message}
                  {...register("telephone")}
                />
              )}
            </InputMask>
          </Box>
          <TextBold m={1}>Endereço</TextBold>
          <Box
            display={"flex"}
            gap={2}
          >
            <InputMask mask="99999-999" {...register("address.cep")}>
              {/* @ts-expect-error @ts-expect-error*/}
              {() => (
                <TextField 
                  label={"CEP"}
                  placeholder="00000-000"
                  margin="normal"
                  size="small"
                  error={!!errors?.address?.cep}
                  helperText={errors.address?.cep?.message}
                  {...register("address.cep")}
                />
              )}
            </InputMask>
            <TextField 
              label={"Número"}
              placeholder="000"
              margin="normal"
              size="small"
              {...register("address.number")}
              error={!!errors?.address?.number}
              helperText={errors.address?.number?.message}
            />
          </Box>
          <TextField 
            label={"Rua"}
            placeholder="Ex: Alameda Juscelino Kubstcheck"
            margin="normal"
            size="small"
            {...register("address.street")}
            error={!!errors?.address?.street}
            helperText={errors.address?.street?.message}
          />
          <TextField 
            label={"Bairro"}
            placeholder="Ex: Estrela"
            margin="normal"
            size="small"
            {...register("address.neighborhood")}
            error={!!errors?.address?.neighborhood}
            helperText={errors.address?.neighborhood?.message}
          />
          <Box
            display={"flex"}
            gap={2}
            mb={2}
            alignItems={'center'}
          >
            <TextField 
              label={"Cidade"}
              placeholder="Ex: São Paulo"
              margin="normal"
              size="small"
              {...register("address.city")}
              error={!!errors?.address?.city}
              helperText={errors.address?.city?.message}
            />
            <div style={{width: "50%"}}>
              <TextRegular color={errors.address?.state ? "red" : "gray"} size={12}>Estado</TextRegular>
              <Select
                {...register("address.state")}
                sx={{ height: 40, width: "100%", marginBottom: !errors.address?.state ? 1 : 4  }}
                placeholder="teste"
                error={!!errors.address?.state}
                defaultValue={state}
              >
                <MenuItem disabled value="">
                  <em>Selecione o estado</em>
                </MenuItem>
                {states.map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </Select>
            </div>
          </Box>
          <ButtonDefault 
            title={user ? "Editar" : "Cadastrar"}
            endIcon={<SaveIcon />}
            type="submit"
          />
        </FormControl>
      </form>  
    </Box>
  )
}