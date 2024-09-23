import { User } from "@/types/user";
import { 
  Paper, 
  TableContainer, 
  TableHead, 
  Table, 
  TableRow, 
  TableCell, 
  TableBody
} from "@mui/material";

interface TableDataProps {
  header: string[];
  data?: User[];
}

export default function TableData({ header }: TableDataProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((item) => (
              <TableCell key={item} align="left">{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  )
}