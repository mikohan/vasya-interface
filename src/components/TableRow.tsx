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
  toggleDone,
} from '../store/actions';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const greenColor = green[700];
const greyColor = grey[300];
const redColor = red[700];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    muttedText: {
      color: greyColor,
      textDecoration: 'line-trought',
    },
    greenText: {
      color: greenColor,
    },
    redText: {
      color: redColor,
    },
  })
);

interface IProps {
  myRow: IRow;
  ready?: boolean;
}
export default function TableRowComponent({ myRow, ready }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(myRow.description);
  const [checked, setChecked] = React.useState(myRow.isDone || false);

  const handleDesc = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDesc(event.target.value);
    dispatch(changeDescriptionAction(myRow.uuid, desc));
  };
  const handleSaveDescToServer = () => {
    dispatch(putRowToServerThunk(myRow));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(toggleDone(myRow, event.target.checked));

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
      checked={checked}
      onChange={handleChange}
      color="primary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  );
  return (
    <React.Fragment>
      <TableRow>
        <TableCell className={myRow.isDone ? classes.muttedText : ''}>
          {!ready && checkbox}
        </TableCell>
        <TableCell className={myRow.isDone ? classes.muttedText : ''}>
          {myRow.oneCId}
        </TableCell>
        <TableCell
          className={myRow.isDone ? classes.muttedText : ''}
          component="th"
          scope="row"
        >
          {myRow.name}
        </TableCell>
        <TableCell
          className={myRow.isDone ? classes.muttedText : ''}
          align="right"
        >
          {myRow.brand}
        </TableCell>
        <TableCell
          className={myRow.isDone ? classes.muttedText : ''}
          align="right"
        >
          {myRow.catNumber}
        </TableCell>
        <TableCell
          className={myRow.isDone ? classes.muttedText : ''}
          align="right"
        >
          {myRow.photo ? (
            <CheckIcon
              className={myRow.isDone ? classes.muttedText : classes.greenText}
            />
          ) : (
            <ClearIcon
              className={myRow.isDone ? classes.muttedText : classes.redText}
            />
          )}
        </TableCell>
        <TableCell
          className={myRow.isDone ? classes.muttedText : ''}
          align="right"
        >
          {myRow.photoSite ? (
            <CheckIcon
              className={myRow.isDone ? classes.muttedText : classes.greenText}
            />
          ) : (
            <ClearIcon
              className={myRow.isDone ? classes.muttedText : classes.redText}
            />
          )}
        </TableCell>
        <TableCell align="right">
          {myRow.video ? (
            <CheckIcon
              className={myRow.isDone ? classes.muttedText : classes.greenText}
            />
          ) : (
            <ClearIcon
              className={myRow.isDone ? classes.muttedText : classes.redText}
            />
          )}
        </TableCell>
        <TableCell align="right">
          {myRow.attibute ? (
            <CheckIcon
              className={myRow.isDone ? classes.muttedText : classes.greenText}
            />
          ) : (
            <ClearIcon
              className={myRow.isDone ? classes.muttedText : classes.redText}
            />
          )}
        </TableCell>
        <TableCell style={customColumnStyle} align="right">
          {ready ? (
            myRow.description
          ) : (
            <TextField
              id="standard-basic"
              label="Заметки"
              multiline
              onChange={handleDesc}
              onBlur={handleSaveDescToServer}
              value={desc}
            />
          )}
        </TableCell>
        <TableCell align="right">
          <a
            className={myRow.isDone ? classes.muttedText : ''}
            href={myRow.linkToSite}
            target="_blank"
            rel="noreferrer"
          >
            <LinkIcon color="primary" />
          </a>
        </TableCell>
        <TableCell>
          {!ready && (
            <DeleteOutlinedIcon
              className={myRow.isDone ? classes.muttedText : ''}
              onClick={() => handleDelete(myRow.uuid, myRow.id)}
              color="secondary"
            />
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
