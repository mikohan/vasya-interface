interface IUrls {
  fetchRowsUrl: string;
  angaraUrl: string;
  checkProductUrl: string;
  deleteUrl: string;
}

export const Urls: IUrls = {
  fetchRowsUrl: 'http://localhost:8000/vasyainterface/workingrows/rows/',
  angaraUrl:
    'http://angara77.com/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
  checkProductUrl: 'https://partshub.tk/vasyainterface/check',
  deleteUrl: 'http://localhost:8000/vasyainterface/workingrows/rows',
};
