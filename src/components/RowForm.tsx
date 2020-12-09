import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { IRow } from '../interfaces';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import { setOneCIdAction, toggleDone } from '../store/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spaceBetween: {
      marginBottom: theme.spacing(2),
    },
    indexNumber: {
      fontWeight: 500,
    },
    firstBox: {
      display: 'flex',
      alignItems: 'center',
      juctifyContent: 'space-between',
      '& span': {
        width: '100%',
        height: '100%',
      },
    },
    deleteIcon: {
      paddingTop: 2,
      cursor: 'pointer',
    },
  })
);

interface IProps {
  idx: number;
  row: IRow;
  setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteRow: (id: string) => void;
}

export default function Row({
  row,
  setDisabledButton,
  idx,
  handleDeleteRow,
}: IProps) {
  const classes = useStyles();

  console.log(row.uuid);

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
    setDesc(row.description);
  }, [row]);

  const dispatch = useDispatch();

  const handleOneCBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('On blur occurs');
  };

  const handleChangeOneC = (id: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    const newValue = isNaN(value) ? 0 : value;
    setOneCId(newValue);
    dispatch(setOneCIdAction(newValue, id));
    if (!newValue) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
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
  const handleIsDoneChange = (id: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(toggleDone(id, event.target.checked));
  };

  return (
    <Grid className={classes.spaceBetween} container spacing={1}>
      <Grid item xs={1}>
        <Box className={classes.firstBox}>
          <span className={classes.indexNumber}>{idx + 1}</span>
          <span>
            <DeleteOutlinedIcon
              onClick={() => handleDeleteRow(row.uuid)}
              className={classes.deleteIcon}
              color="secondary"
            />
          </span>
          <span>
            <Checkbox
              checked={row.done}
              onChange={handleIsDoneChange(row.uuid)}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </span>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <TextField
          label="1C ID"
          variant="outlined"
          value={oneCId}
          onChange={handleChangeOneC(row.uuid)}
          onBlur={handleOneCBlur}
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
      <Grid item xs={1}>
        <TextField
          label="Photo"
          variant="outlined"
          value={photo}
          onChange={handleChangePhoto}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={1}>
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
      <Grid item xs={1}>
        <Typography variant="button">Url to site</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="button">Url to interface</Typography>
      </Grid>
    </Grid>
  );
}
