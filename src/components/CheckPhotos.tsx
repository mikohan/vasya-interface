import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Urls } from '../config';
import Spiner from './Spiner';

export default function CheckPhotos() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const getNoPhotoList = async () => {
    setLoading(true);
    const res = await axios.get(Urls.noPhotosList);
    setPhotos(res.data);
    setLoading(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {loading ? (
            <Spiner />
          ) : (
            <Button onClick={getNoPhotoList} variant="outlined">
              Get Items
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          {photos.length}
        </Grid>
      </Grid>

      {JSON.stringify(photos, null, 2)}
    </div>
  );
}
