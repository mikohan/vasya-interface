import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import RowForm from './RowForm';

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
  ];
  const [rows, setRows] = useState(initRow);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {rows.map((row: IRow) => (
          <RowForm row={row} />
        ))}
      </Grid>
    </Grid>
  );
}
