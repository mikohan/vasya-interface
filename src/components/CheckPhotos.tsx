import { Button, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Urls } from '../config';
import Spiner from './Spiner';
import CheckTable from './CheckPhotoTable';

export default function CheckPhotos() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);

  const getNoPhotoList = async () => {
    setLoading(true);
    const res = await axios.get(Urls.noPhotosList);

    const resFold = await axios.get(Urls.photoFolder);
    const folders = resFold.data.fld;
    const result: any[] = [];
    for (let item of res.data) {
      if (item.one_c_id) {
        if (folders.includes(item.one_c_id.toString())) {
          result.push(item);
        }
      }
    }
    setPhotos(result);
    setLoading(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {loading ? (
            <React.Fragment>
              <Grid item xs={12}>
                <Spiner />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Wait products checking now...
                </Typography>
              </Grid>
            </React.Fragment>
          ) : (
            <Button onClick={getNoPhotoList} variant="outlined">
              Get Items
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          Total Photos Missing: {photos.length}
        </Grid>
        <Grid item xs={12}>
          <CheckTable rows={photos} />
        </Grid>
      </Grid>
    </div>
  );
}
