import { actionTypes } from './types';
import { fetchRowsUrl, initRow } from '../config';
import { IRow } from '../interfaces';

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
  payload: number;
}

export interface ISetOneCIdAction {
  type: typeof actionTypes.SET_ONE_C_ID;
  payload: number;
}

export type MyAction =
  | IFetchRowsFromServerThunk
  | IAddEmptyRowAction
  | IDeleteRowAction
  | ISetOneCIdAction;

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
const emptyRow: IRow = {
  oneCId: 0,
  name: '',
  brand: '',
  catNumber: '',
  photo: '',
  video: '',
  desc: '',
};

export const addEmptyRow = () => {
  return {
    type: actionTypes.ADD_EMPTY_ROW,
    payload: emptyRow,
  };
};

export const deleteRow = (id: number) => {
  return {
    type: actionTypes.DELETE_ROW,
    payload: id,
  };
};

export const setOneCIdAction = (id: number) => {
  return {
    type: actionTypes.SET_ONE_C_ID,
    payload: id,
  };
};
