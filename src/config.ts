interface IUrls {
  fetchRowsUrl: string;
  angaraUrl: string;
  checkProductUrl: string;
  deleteUrl: string;
  fetchRowsDoneUrl: string;
  noPhotosList: string;
  photoFolder: string;
}

const apiUrl = 'https://angara77.ru';

export function makeUrls(location: string): IUrls {
  if (location === 'local') {
    return {
      fetchRowsUrl: 'http://localhost:8000/vasyainterface/workingrows/rows/',
      fetchRowsDoneUrl:
        'http://localhost:8000/vasyainterface/workingrows/rowsdone/',
      angaraUrl:
        'http://angara77.com/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
      checkProductUrl: 'https://partshub.tk/vasyainterface/check',
      deleteUrl: 'http://localhost:8000/vasyainterface/workingrows/rows',
      noPhotosList: 'http://localhost:8000/vasyainterface/nophoto/',
      photoFolder: 'http://localhost:8000/vasyainterface/checkfolders/',
    };
  }
  return {
    fetchRowsUrl: `${apiUrl}/vasyainterface/workingrows/rows/`,
    fetchRowsDoneUrl: `${apiUrl}/vasyainterface/workingrows/rowsdone/`,
    angaraUrl:
      'http://angara77.com/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
    checkProductUrl: `${apiUrl}/vasyainterface/check`,
    deleteUrl: `${apiUrl}/vasyainterface/workingrows/rows`,
    noPhotosList: `${apiUrl}/vasyainterface/nophoto/`,
    photoFolder: 'http://localhost:8000/vasyainterface/checkfolders/',
  };
}

// Change parameter to 'local' if work with local endpoints
export const Urls = makeUrls('remote');
