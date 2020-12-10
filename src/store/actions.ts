import { actionTypes } from './types';
import { Urls, initRow } from '../config';
import { IRow } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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

export interface ISetOneCId {
  type: typeof actionTypes.SET_ONE_C_ID;
  payload: string;
  oneCId?: number;
}

export interface IMarkDone {
  type: typeof actionTypes.TOGGLE_DONE;
  payload: string;
  isDone: boolean;
}

export interface IChek {
  have_photo: boolean;
  have_video: boolean;
  have_attribute: boolean;
  have_description: boolean;
}

export type MyAction =
  | IFetchRowsFromServerThunk
  | IAddEmptyRowAction
  | IDeleteRowAction
  | ISetOneCId
  | IMarkDone;

export const fetchRowsFromServerThunk = () => {
  return async (dispatch: Dispatch) => {
    const res = await axios.get(Urls.fetchRowsUrl);
    dispatch({
      type: actionTypes.FETCH_ROWS_IN_WORK,
      payload: res.data,
    });
  };
};

export const addEmptyRow = (row: IRow): IAddEmptyRowAction => {
  return {
    type: actionTypes.ADD_EMPTY_ROW,
    payload: row,
  };
};

export const deleteRow = (id: string): IDeleteRowAction => {
  return {
    type: actionTypes.DELETE_ROW,
    payload: id,
  };
};

export const deleteRowThunk = (uuid: string, id: any) => {
  return async (dispatch: Dispatch) => {
    console.log(id);
    try {
      await axios.delete(`${Urls.deleteUrl}/${id}/`);
    } catch (e) {
      console.log(e);
    }

    dispatch(deleteRow(uuid));
  };
};

export const setOneCIdAction = (oneCId: number, id: string): ISetOneCId => {
  return {
    type: actionTypes.SET_ONE_C_ID,
    payload: id,
    oneCId,
  };
};

export const toggleDone = (id: string, isDone: boolean): IMarkDone => {
  return {
    type: actionTypes.TOGGLE_DONE,
    payload: id,
    isDone: isDone,
  };
};

export const fillOutRowWithDataThunk = (oneCId: number) => {
  return async (dispatch: Dispatch) => {
    //here will be another call of get photos, videos etc
    //1. fill out from angara77 -- done
    //2. Save to 76 endpoint -- done
    //3. Check for photo video etc

    const res = await axios.get(`${Urls.angaraUrl}${oneCId}`);
    const data = await res.data;
    try {
    } catch (e) {
      console.log(e.result.data);
    }

    let populatedRow: IRow;

    let check: IChek = {
      have_photo: false,
      have_video: false,
      have_description: false,
      have_attribute: false,
    };

    const newRow: IRow = {
      id: data.id,
      uuid: uuidv4(),
      oneCId: oneCId,
      name: data.ang_name,
      brand: data.brand,
      catNumber: data.cat,
      photo: false,
      video: false,
      description: '',
      done: false,
    };

    try {
      const res = await axios.get(`${Urls.checkProductUrl}/${oneCId}/`);
      check = res.data;
    } catch (e) {
      console.log(e);
    }

    populatedRow = { ...newRow };
    const { have_photo, have_video, have_description, have_attribute } = check;
    if (check) {
      populatedRow.photo = have_photo;
      populatedRow.video = have_video;
      populatedRow.descSite = have_description;
      populatedRow.attibute = have_attribute;
      populatedRow.linkToSite = `https://angara77.com/porter-0520000611-${oneCId}/`;
    }

    try {
      console.log(newRow);
      await axios.post(Urls.fetchRowsUrl, newRow);
      dispatch(addEmptyRow(populatedRow));
    } catch (error) {
      if (error.response) {
        dispatch(errorMessageAction(error.response.data));
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };
};

export const errorMessageAction = (error: any) => {
  return {
    type: actionTypes.SET_ERROR_MESSAGE,
    payload: error,
  };
};
