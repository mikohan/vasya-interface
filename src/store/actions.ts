import { actionTypes } from './types';
import { fetchRowsUrl, initRow } from '../config';
import { IRow } from '../interfaces';

import { Dispatch } from 'redux';

export interface IFetchRowsFromServerThunk {
  type: typeof actionTypes.FETCH_ROWS_IN_WORK;
  payload: IRow[];
}

export type MyAction = IFetchRowsFromServerThunk;

export const fetchRowsFromServerThunk = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.FETCH_ROWS_IN_WORK,
      payload: initRow,
    });
    // const res = axios.get(fetchRowsUrl)
  };
};
