import axios from 'axios';
import { useEffect, useState } from 'react';
import { Urls } from '../config';

export default function CheckPhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log(Urls.noPhotosList);
      const res = await axios.get(Urls.noPhotosList);
      setPhotos(res.data);
    };
    getData();
  }, [photos]);

  return <div>{JSON.stringify(photos, null, 2)}</div>;
}
