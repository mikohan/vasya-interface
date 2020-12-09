import { IRow } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

interface IUrls {
  fetchRowsUrl: string;
  angaraUrl: string;
}

export const Urls: IUrls = {
  fetchRowsUrl: 'http://localhost:8000/vasyainterface/workingrows/rows/',
  angaraUrl:
    'http://angara77.loc/admin33338/dataApi/vasyaInterfaceEndpoint.php?oneCId=',
};

export const initRow: IRow[] = [
  {
    id: uuidv4(),
    oneCId: 23,
    name: 'some name',
    brand: 'brand',
    catNumber: '84858r8587',
    photo: 'path/to/folder',
    video: 'urlVideo',
    desc: 'textfield',
    done: false,
  },
  {
    id: uuidv4(),
    oneCId: 92,
    name: 'Seconde row',
    brand: 'brand',
    catNumber: '84858r8587',
    photo: 'path/to/folder',
    video: 'urlVideo',
    desc: 'textfield',
    done: true,
  },
];
