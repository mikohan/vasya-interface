import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Urls } from '../config';

export default function CheckPhotos() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const getNoPhotoList = async () => {
    setLoading(true);
    const res = await axios.get(Urls.noPhotosList);
    setPhotos(res.data);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={getNoPhotoList} variant="outlined">
            Get Items
          </Button>
        </Grid>
      </Grid>

      {JSON.stringify(photos, null, 2)}
    </div>
  );
}
