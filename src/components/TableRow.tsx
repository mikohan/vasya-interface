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
        <TableCell>{myRow.oneCId}</TableCell>
        <TableCell component="th" scope="row">
          {myRow.name}
        </TableCell>
        <TableCell align="right">{myRow.brand}</TableCell>
        <TableCell align="right">{myRow.catNumber}</TableCell>
        <TableCell align="right">{myRow.photo ? 'yes' : 'no'}</TableCell>
        <TableCell align="right">{myRow.photoSite ? 'est' : 'net'}</TableCell>
        <TableCell align="right">
          {myRow.video ? 'est vid' : 'net vid'}
        </TableCell>
        <TableCell align="right">
          {myRow.attibute ? 'attr' : 'no attr'}
        </TableCell>
        <TableCell align="right">
          <TextField
            id="standard-basic"
            label="Заметки"
            value={myRow.description}
          />
        </TableCell>
        <TableCell align="right">{myRow.oneCId}</TableCell>
        <TableCell align="right">{myRow.oneCId}</TableCell>
        <TableCell>
          <DeleteOutlinedIcon color="secondary" />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
