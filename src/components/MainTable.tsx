import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { IRow } from '../interfaces';
import { Button, Grid, Hidden } from '@material-ui/core';
import {
  toggleSnakbarAction,
  fetchRowsFromServerThunk,
  fillOutRowWithDataThunk,
  checkAllAttributesAction,
  orderItemsAction,
  orderItemsByDateCreateAction,
} from '../store/actions';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { IState } from '../store/reducers';

import Spiner from './Spiner';
import TableComponent from './Table';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TestPage() {
  const dispatch = useDispatch();
  const error = useSelector((state: any) => {
    return state.mainState.errorMessage;
  });
  const { openSnakbar } = useSelector((state: any) => state.mainState);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleSnakbarAction(false));
  };

  const [oneCId, setOneCId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchRowsFromServerThunk());
  }, [dispatch]);

  const rowsInWork: IRow[] = useSelector((state: any) => {
    return state.mainState.rowsInWork;
  });
  console.log(rowsInWork);

  const handleChangeOneC = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    const newValue = isNaN(value) ? 0 : value;
    setOneCId(newValue);
  };

  const handleAddNewRowEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      dispatch(fillOutRowWithDataThunk(oneCId));
      // setOneCId(0);
    }
  };

  const handleAddNewRow = () => {
    dispatch(fillOutRowWithDataThunk(oneCId));

    // checking All updates for photo, video , etc..
    dispatch(checkAllAttributesAction());
    setOneCId(0);
  };
  const handleUpdateInfo = () => {
    dispatch(checkAllAttributesAction());
  };

  let errorArr = [];
  for (const key in error) {
    errorArr.push(JSON.stringify({ [key]: error[key] }));
  }

  const isLoading = useSelector((state: IState) => {
    return state.mainState.isLoading;
  });

  const handleSorting = () => {
    dispatch(orderItemsAction());
  };

  const handleSortingDataCreated = () => {
    dispatch(orderItemsByDateCreateAction());
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4} md={2}>
          <TextField
            label="1C ID"
            variant="outlined"
            value={oneCId}
            onChange={handleChangeOneC}
            size="small"
            fullWidth
            onKeyDown={handleAddNewRowEnter}
          />
        </Grid>
        <Grid item xs={2}>
          <Fab
            type="submit"
            onClick={handleAddNewRow}
            color="primary"
            size="small"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={2}>
            <Typography variant="h6">
              Total on Page: {rowsInWork.length}
            </Typography>
          </Grid>
        </Hidden>
        <Grid item xs={4}>
          {isLoading ? (
            <Spiner />
          ) : (
            <Button
              onClick={handleUpdateInfo}
              variant="outlined"
              color="primary"
            >
              UPDATE INFO
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <TableComponent
            rowsInWork={rowsInWork}
            handleSorting={handleSorting}
            handleSortingDataCreated={handleSortingDataCreated}
          />
        </Grid>
      </Grid>

      <Snackbar
        open={openSnakbar}
        autoHideDuration={16000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          {errorArr.map((str: string, i: number) => (
            <div key={i}>{str}</div>
          ))}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

// Need to make alert working later on
