interface IUrls {
  fetchRowsUrl: string;
  angaraUrl: string;
  checkProductUrl: string;
  deleteUrl: string;
  fetchRowsDoneUrl: string;
  noPhotosList: string;
}

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
    };
  }
  return {
    fetchRowsUrl: 'https://partshub.tk/vasyainterface/workingrows/rows/',
    fetchRowsDoneUrl:
      'https://partshub.tk/vasyainterface/workingrows/rowsdone/',
    angaraUrl:
      'http://angara77.com/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
    checkProductUrl: 'https://partshub.tk/vasyainterface/check',
    deleteUrl: 'https://partshub.tk/vasyainterface/workingrows/rows',
    noPhotosList: 'https://partshub.tk/vasyainterface/nophoto/',
  };
}

// Change parameter to 'local' if work with local endpoints
export const Urls = makeUrls('remote');
