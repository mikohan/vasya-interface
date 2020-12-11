import { IRow } from '../interfaces';

import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';
import {
  changeDescriptionAction,
  deleteRowThunk,
  putRowToServerThunk,
} from '../store/actions';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import green from '@material-ui/core/colors/green';
import LinkIcon from '@material-ui/icons/Link';

const greenColor = green[700];

interface IProps {
  myRow: IRow;
}
export default function TableRowComponent({ myRow }: IProps) {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(myRow.description);

  const handleDesc = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDesc(event.target.value);
    dispatch(changeDescriptionAction(myRow.uuid, desc));
  };
  const handleSaveDescToServer = () => {
    console.log('On Blur');
    dispatch(putRowToServerThunk(myRow));
  };

  const handleDelete = (uuid: string, id: any): void => {
    // needs to add confirm
    const conf = window.confirm('Are You Shure?');
    if (conf) {
      dispatch(deleteRowThunk(uuid, id));
    } else {
      return;
    }
  };
  const customColumnStyle = { minWidth: '200px' };
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
        <TableCell align="right">
          {myRow.photo ? (
            <CheckIcon style={{ color: greenColor }} />
          ) : (
            <ClearIcon color="secondary" />
          )}
        </TableCell>
        <TableCell align="right">
          {myRow.photoSite ? (
            <CheckIcon style={{ color: greenColor }} />
          ) : (
            <ClearIcon color="secondary" />
          )}
        </TableCell>
        <TableCell align="right">
          {myRow.video ? (
            <CheckIcon style={{ color: greenColor }} />
          ) : (
            <ClearIcon color="secondary" />
          )}
        </TableCell>
        <TableCell align="right">
          {myRow.attibute ? (
            <CheckIcon style={{ color: greenColor }} />
          ) : (
            <ClearIcon color="secondary" />
          )}
        </TableCell>
        <TableCell style={customColumnStyle} align="right">
          <TextField
            id="standard-basic"
            label="Заметки"
            multiline
            onChange={handleDesc}
            onBlur={handleSaveDescToServer}
            value={desc}
          />
        </TableCell>
        <TableCell align="right">
          <a href={myRow.linkToSite} target="_blank" rel="noreferrer">
            <LinkIcon color="primary" />
          </a>
        </TableCell>
        <TableCell>
          <DeleteOutlinedIcon
            onClick={() => handleDelete(myRow.uuid, myRow.id)}
            color="secondary"
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
