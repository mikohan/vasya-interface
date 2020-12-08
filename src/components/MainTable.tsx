import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import RowForm from './RowForm';
import { Button } from '@material-ui/core';
import { IRow } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IMainState } from '../store/reducers';
import {
  addEmptyRow,
  deleteRow,
  fetchRowsFromServerThunk,
} from '../store/actions';

export default function MainTable() {
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const dispatch = useDispatch();
  const rowsInWork = useSelector((state: any) => {
    return state.mainState.rowsInWork;
  });

  useEffect(() => {
    dispatch(fetchRowsFromServerThunk());
  }, []);

  const addNewRow = () => {
    /* setMyRows([...myRows, emptyRow]); */
    dispatch(addEmptyRow());
    setDisabledButton(true);
  };

  const handleDeleteRow = (id: string) => {
    const conf = window.confirm('Are You Shure?');
    if (conf) {
      // Here needs to dispatch delete action to redux
      console.log(id);
      dispatch(deleteRow(id));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          onClick={addNewRow}
          variant="outlined"
          size="small"
          color="primary"
          disabled={disabledButton}
        >
          New Row
        </Button>
      </Grid>
      <Grid item xs={12}>
        {rowsInWork.map((row: IRow, idx: number) => (
          <RowForm
            idx={idx}
            key={idx}
            row={row}
            setDisabledButton={setDisabledButton}
            handleDeleteRow={handleDeleteRow}
          />
        ))}
      </Grid>
    </Grid>
  );
}
