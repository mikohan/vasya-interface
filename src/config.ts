interface IUrls {
  fetchRowsUrl: string;
  angaraUrl: string;
  checkProductUrl: string;
  deleteUrl: string;
}

export const Urlss: IUrls = {
  fetchRowsUrl: 'https://partshub.tk/vasyainterface/workingrows/rows/',
  angaraUrl:
    'http://angara77.com/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
  checkProductUrl: 'https://partshub.tk/vasyainterface/check',
  deleteUrl: 'https://partshub.tk/vasyainterface/workingrows/rows',
};

export function makeUrls(location: string): IUrls {
  if (location === 'local') {
    return {
      fetchRowsUrl: 'http://localhost:8000/vasyainterface/workingrows/rows/',
      angaraUrl:
        'http://angara77.com/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
      checkProductUrl: 'https://partshub.tk/vasyainterface/check',
      deleteUrl: 'http://localhost:8000/vasyainterface/workingrows/rows',
    };
  }
  return {
    fetchRowsUrl: 'https://partshub.tk/vasyainterface/workingrows/rows/',
    angaraUrl:
      'http://angara77.com/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
    checkProductUrl: 'https://partshub.tk/vasyainterface/check',
    deleteUrl: 'https://partshub.tk/vasyainterface/workingrows/rows',
  };
}
export const Urls = makeUrls('local');
