import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import TableRowComponent from './TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { IRow } from '../interfaces';
import { Button, Grid } from '@material-ui/core';
import {
  fetchRowsFromServerThunk,
  setOneCIdAction,
  toggleDone,
} from '../store/actions';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    topRowNumber: {
      padding: theme.spacing(2),
    },
  })
);

export default function TestPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [oneCId, setOneCId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchRowsFromServerThunk());
    console.log('triggered');
  }, []);

  const rowsInWork: IRow[] = useSelector((state: any) => {
    return state.mainState.rowsInWork;
  });

  const handleChangeOneC = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    const newValue = isNaN(value) ? 0 : value;
    setOneCId(newValue);
  };

  const handleOneCBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('On blur occurs', event.target.value);
  };

  const handleAddNewRow = () => {
    console.log('Add new row here');
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            label="1C ID"
            variant="outlined"
            value={oneCId}
            onChange={handleChangeOneC}
            onBlur={handleOneCBlur}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Fab
            onClick={handleAddNewRow}
            color="primary"
            size="small"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">{oneCId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsInWork.map((row: IRow) => (
                  <TableRowComponent key={row.id} myRow={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
