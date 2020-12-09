import { IRow } from '../interfaces';

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
  myRow: IRow;
}
export default function TableRowComponent({ myRow }: IProps) {
  const checkbox = (
    <Checkbox
      checked={myRow.done}
      color="primary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  );
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{checkbox}</TableCell>
        <TableCell component="th" scope="row">
          {myRow.name}
        </TableCell>
        <TableCell align="right">{myRow.oneCId}</TableCell>
        <TableCell align="right">{myRow.name}</TableCell>
        <TableCell align="right">{myRow.brand}</TableCell>
        <TableCell align="right">{myRow.catNumber}</TableCell>
        <TableCell align="right">{myRow.description}</TableCell>
        <TableCell align="right">{myRow.description}</TableCell>
        <TableCell align="right">
          <TextField id="standard-basic" label="Standard" value={myRow.name} />
        </TableCell>
        <TableCell>
          <DeleteOutlinedIcon color="secondary" />
        </TableCell>
        <TableCell align="right">{myRow.oneCId}</TableCell>
        <TableCell align="right">{myRow.oneCId}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}
