import { User } from "@/types/user";
import { Button, Paper, Stack  } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import ModalDefault from "../Modal";
import UserForm from "../Forms/UserForm";
import DeleteBanner from "../DeleteBanner";
interface DataGridDefaultProps {
  rows: User[];
}

export default function DataGridDefault({ rows }: DataGridDefaultProps) {
  const { setUser} = useAppContext(); 
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('');

  const handleClose = () => setOpen(false);

  const selectUser = (user: User) => {
    setUser(user);
    setOpen(true);
  }

  const columns: GridColDef[] = [
    {field: "id", headerName: "ID", flex: 1, disableColumnMenu: true},
    {field: 'name', headerName: "Nome", flex: 2, disableColumnMenu: true},
    {field: 'cpf', headerName: "CPF", flex: 2, disableColumnMenu: true},
    {field: 'email', headerName: "E-mail", flex: 2, disableColumnMenu: true},
    {field: 'telephone', headerName: "Telephone", flex: 2, disableColumnMenu: true},
    {
      field: "action",
      headerName: "Ação",
      flex: 2, 
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1} mt={1}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="small" 
            endIcon={<EditIcon />}
            onClick={() => {
              setOption('edit')
              selectUser(params.row as User)
            }}
          >
            Editar
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            size="small" 
            endIcon={<DeleteIcon />}
            onClick={() => {
              setOption('delete')
              selectUser(params.row as User)
            }}
          >
            Deletar
          </Button>
        </Stack>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: "70vh", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
      <ModalDefault 
        open={open}
        onClose={handleClose}
      >
        {option === 'edit' ? 
          <UserForm closeModal={handleClose}/> 
          : 
          <DeleteBanner closeModal={handleClose}/>
        }
      </ModalDefault>
    </Paper>
  )
}