import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { IRow } from './MainTable';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spaceBetween: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface IProps {
  row: IRow;
  setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Row({ row, setDisabledButton }: IProps) {
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
    setDisabledButton(false);
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
    <Grid className={classes.spaceBetween} container spacing={1}>
      <Grid item xs={1}>
        <Checkbox
          defaultChecked
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </Grid>
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
      <Grid item xs={2}>
        <TextField
          label="Description"
          variant="outlined"
          value={desc}
          onChange={handleChangeDesc}
          size="small"
          fullWidth
          multiline
        />
      </Grid>
    </Grid>
  );
}
