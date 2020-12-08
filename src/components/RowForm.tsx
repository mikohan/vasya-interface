import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { IRow } from './MainTable';
import Grid from '@material-ui/core/Grid';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';

const colums: ColDef[] = [
  { field: 'oneCId', headerName: '1C ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'brand', headerName: 'Brand', width: 130 },
  { field: 'catNumber', headerName: 'Cat Number', width: 130 },
  { field: 'photo', headerName: 'Photo', width: 130 },
  { field: 'video', headerName: 'Video', width: 130 },
  { field: 'desc', headerName: 'Description', width: 130 },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

interface IProps {
  row: IRow;
}

export default function BasicTextFields({ row }: IProps) {
  const classes = useStyles();

  const [oneCId, setOneCId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [catNumber, setCatNumber] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  useEffect(() => {
    setName(row.name);
    setOneCId(row.oneCId);
    setBrand(row.brand);
    setCatNumber(row.catNumber);
    setPhoto(row.photo);
    setVideo(row.video);
    setDesc(row.desc);
  }, [row]);

  const handleChangeOneC = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOneCId(parseInt(event.target.value));
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  };
  const handleChangeCatNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCatNumber(event.target.value);
  };
  const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(event.target.value);
  };
  const handleChangeVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(event.target.value);
  };
  const handleChangeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  console.log(name, desc);
  return (
    <Grid container spacing={1}>
      <Grid item xs={1}>
        <TextField
          label="1C ID"
          variant="outlined"
          value={oneCId}
          onChange={handleChangeOneC}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleChangeName}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Brand"
          variant="outlined"
          value={brand}
          onChange={handleChangeBrand}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="Cat Number"
          variant="outlined"
          value={catNumber}
          onChange={handleChangeCatNumber}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Photo"
          variant="outlined"
          value={photo}
          onChange={handleChangePhoto}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Video"
          variant="outlined"
          value={video}
          onChange={handleChangeVideo}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Description"
          variant="outlined"
          value={desc}
          onChange={handleChangeDesc}
          size="small"
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
