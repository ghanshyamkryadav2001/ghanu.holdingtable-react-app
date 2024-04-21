import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const HoldingsRow = ({ subHoldings }) => {
  return (
    <Table size="small">
      <TableBody>
        {subHoldings.map((subHolding, index) => (
          <TableRow key={index}>
            <TableCell>{subHolding.asset}</TableCell>
            <TableCell align="right">{subHolding.amount}</TableCell>
            <TableCell align="right">{subHolding.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HoldingsRow;
