import { actionTypes } from './types';
import { fetchRowsUrl, initRow } from '../config';
import { IRow } from '../interfaces';

import { Dispatch } from 'redux';

export interface IFetchRowsFromServerThunk {
  type: typeof actionTypes.FETCH_ROWS_IN_WORK;
  payload: IRow[];
}

export type MyAction = IFetchRowsFromServerThunk;

const fetcher = () => {
  return new Promise((resolve, reject) => {
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
