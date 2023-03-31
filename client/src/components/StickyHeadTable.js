import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditProductDialog from './EditProductDialog';

// Set column headers
const columns = [
  { id: 'productId', label: 'Product ID', minWidth: 100 },
  { id: 'productName', label: 'Product Name', minWidth: 100 },
  {
    id: 'productOwnerName',
    label: 'Product Owner Name',
    minWidth: 100,
  },
  {
    id: 'developers',
    label: 'Developers',
    minWidth: 100,
    format: (value) => value.join(", "),
  },
  {
    id: 'scrumMasterName',
    label: 'Scrum Master Name',
    minWidth: 100,
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 100,
  },
  {
    id: 'methodology',
    label: 'Methodology',
    minWidth: 100,
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
  },

];

export default function StickyHeadTable({ rows, setRefresh, refresh }) {

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: 15 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value)
                            : value}
                          {column.id === "actions"
                            ? <EditProductDialog setRefresh={setRefresh} refresh={refresh} row={row} />
                            : null
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}