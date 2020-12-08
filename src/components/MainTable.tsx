import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import RowForm from './RowForm';
import { Button } from '@material-ui/core';

export interface IRow {
  oneCId: number;
  name: string;
  brand: string;
  catNumber: string;
  photo: string;
  video: string;
  desc: string;
}

export default function MainTable() {
  const initRow: IRow[] = [
    {
      oneCId: 23,
      name: 'some name',
      brand: 'brand',
      catNumber: '84858r8587',
      photo: 'path/to/folder',
      video: 'urlVideo',
      desc: 'textfield',
    },
    {
      oneCId: 92,
      name: 'Seconde row',
      brand: 'brand',
      catNumber: '84858r8587',
      photo: 'path/to/folder',
      video: 'urlVideo',
      desc: 'textfield',
    },
  ];

  const [myRows, setMyRows] = useState<IRow[]>(initRow);

  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const emptyRow: IRow = {
    oneCId: 0,
    name: '',
    brand: '',
    catNumber: '',
    photo: '',
    video: '',
    desc: '',
  };

  const addNewRow = () => {
    setMyRows([...myRows, emptyRow]);
    setDisabledButton(true);
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
        {myRows.map((row: IRow) => (
          <RowForm
            key={row.oneCId}
            row={row}
            setDisabledButton={setDisabledButton}
          />
        ))}
      </Grid>
    </Grid>
  );
}
