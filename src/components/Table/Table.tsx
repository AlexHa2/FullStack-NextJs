'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function TableComponent({rows} : {rows:Array<object>}) {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Dessert (100g serving)</StyledTableCell>
          <StyledTableCell align="center">Calories</StyledTableCell>
          <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
          <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
          <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.id}>
            
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="center">{row.id}</StyledTableCell>
            <StyledTableCell align="right"><Image src={row.avatar} width={50} height={50} alt='image'/></StyledTableCell>
            <StyledTableCell align="center">{row.dayofbirth}</StyledTableCell>
            <StyledTableCell align="right">{row.old}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
