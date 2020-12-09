import { IRow } from '../interfaces';

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

interface IProps {
  myRow: IRow;
}
export default function TableRowComponent({ myRow }: IProps) {
  return (
    <TableRow key={myRow.name}>
      <TableCell component="th" scope="row">
        {myRow.name}
      </TableCell>
      <TableCell align="right">{myRow.oneCId}</TableCell>
      <TableCell align="right">
        <TextField id="standard-basic" label="Standard" value={myRow.name} />
      </TableCell>
      <TableCell align="right">{myRow.name}</TableCell>
      <TableCell align="right">{myRow.brand}</TableCell>
      <TableCell align="right">{myRow.catNumber}</TableCell>
      <TableCell align="right">{myRow.desc}</TableCell>
    </TableRow>
  );
}
