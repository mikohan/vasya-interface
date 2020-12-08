import { actionTypes } from './types';
import { fetchRowsUrl, initRow } from '../config';
import { IRow } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';

import { Dispatch } from 'redux';

export interface IFetchRowsFromServerThunk {
  type: typeof actionTypes.FETCH_ROWS_IN_WORK;
  payload: IRow[];
}

export interface IAddEmptyRowAction {
  type: typeof actionTypes.ADD_EMPTY_ROW;
  payload: IRow;
}

export interface IDeleteRowAction {
  type: typeof actionTypes.DELETE_ROW;
  payload: string;
}

export type MyAction =
  | IFetchRowsFromServerThunk
  | IAddEmptyRowAction
  | IDeleteRowAction;

const fetcher = () => {
  return new Promise((resolve) => {
    resolve([...initRow]);
  });
};

export const fetchRowsFromServerThunk = () => {
  return async (dispatch: Dispatch) => {
    const res = await fetcher();
    dispatch({
      type: actionTypes.FETCH_ROWS_IN_WORK,
      payload: res,
    });
    // const res = axios.get(fetchRowsUrl)
  };
};

const emptyRow = (): IRow => {
  return {
    id: uuidv4(),
    oneCId: 0,
    name: '',
    brand: '',
    catNumber: '',
    photo: '',
    video: '',
    desc: '',
  };
};

export const addEmptyRow = () => {
  return {
    type: actionTypes.ADD_EMPTY_ROW,
    payload: emptyRow(),
  };
};

export const deleteRow = (id: string) => {
  return {
    type: actionTypes.DELETE_ROW,
    payload: id,
  };
};
