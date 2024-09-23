import { User } from "@/types/user";
import { Button, Paper, Stack  } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataGridDefaultProps {
  rows: User[];
}

export default function DataGridDefault({ rows }: DataGridDefaultProps) {
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
      renderCell: () => (
        <Stack direction="row" spacing={1} mt={1}>
          <Button variant="contained" color="primary" size="small" endIcon={<EditIcon />}>
            Editar
          </Button>
          <Button variant="contained" color="secondary" size="small" endIcon={<DeleteIcon />}>
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
    </Paper>
  )
}