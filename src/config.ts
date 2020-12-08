import { IRow } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

export const fetchRowsUrl = '';
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
  },
];
