import { actionTypes } from './types';
import { Urls } from '../config';
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
  payload: IRow;
  isDone: boolean;
}

export interface IChek {
  have_photo: boolean;
  have_video: boolean;
  have_attribute: boolean;
  have_description: boolean;
  have_photo_in_folder: boolean;
}

export interface ICheckAllAttributesAction {
  type: typeof actionTypes.UPDATE_ROWS_ATTRS;
  payload: IRow[];
}

export type MyAction =
  | IFetchRowsFromServerThunk
  | IAddEmptyRowAction
  | IDeleteRowAction
  | ISetOneCId
  | IMarkDone;

export const fetchRowsFromServerThunk = () => {
  return async (dispatch: Dispatch<any>) => {
    const res = await axios.get(Urls.fetchRowsUrl);

    dispatch({
      type: actionTypes.FETCH_ROWS_IN_WORK,
      payload: res.data,
    });
    // here some suspecious pise of code
    dispatch(checkAllAttributesAction());
    dispatch(loadingAction(false));
  };
};

export const fetchRowsFromServerReadyThunk = () => {
  return async (dispatch: Dispatch<any>) => {
    const res = await axios.get(Urls.fetchRowsDoneUrl);

    dispatch({
      type: actionTypes.FETCH_ROWS_READY,
      payload: res.data,
    });
    // here some suspecious pise of code
    dispatch(checkAllAttributesAction(true));
    dispatch(loadingAction(false));
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

export const toggleDone = (row: IRow, isDone: boolean): IMarkDone => {
  return {
    type: actionTypes.TOGGLE_DONE,
    payload: row,
    isDone: isDone,
  };
};

export const fillOutRowWithDataThunk = (oneCId: number) => {
  return async (dispatch: Dispatch) => {
    //here will be another call of get photos, videos etc
    //0. Set loading to true
    //1. fill out from angara77 -- done
    //2. Save to 76 endpoint -- done
    //3. Check for photo video etc
    //4. Set Loading to false

    dispatch(loadingAction(true));
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
      have_photo_in_folder: false,
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
      isDone: false,
    };

    try {
      const res = await axios.get(`${Urls.checkProductUrl}/${oneCId}/`);
      check = res.data;
    } catch (error) {
      dispatch(
        errorMessageAction({
          Error:
            'Продукт с таким Один С ID Еще не заведен в итерфейс. Самое время его туда завести!',
        })
      );
      dispatch(toggleSnakbarAction(true));
      console.log(error.response.data);
    }

    populatedRow = { ...newRow };
    const {
      have_photo,
      have_video,
      have_description,
      have_attribute,
      have_photo_in_folder,
    } = check;
    if (check) {
      populatedRow.photo = have_photo_in_folder;
      populatedRow.photoSite = have_photo;
      populatedRow.video = have_video;
      populatedRow.descSite = have_description;
      populatedRow.attibute = have_attribute;
      populatedRow.linkToSite = `https://angara77.com/porter-0520000611-${oneCId}/`;
    }

    try {
      await axios.post(Urls.fetchRowsUrl, newRow);
      dispatch(addEmptyRow(populatedRow));
    } catch (error) {
      if (error.response) {
        let errorMessage: any = null;
        if (error.response.data.hasOwnProperty('name')) {
          errorMessage = {
            error:
              'Возможно этот товар не выгружается из Один Эски на сайт. Проверь!',
          };
        } else {
          errorMessage = error.response.data;
        }
        dispatch(errorMessageAction(errorMessage));
        dispatch(toggleSnakbarAction(true));
        console.log(error.response.data);
      }
    }

    dispatch(loadingAction(false));
  };
};

export const errorMessageAction = (error: any) => {
  return {
    type: actionTypes.SET_ERROR_MESSAGE,
    payload: error,
  };
};

export const toggleSnakbarAction = (open: boolean = false) => {
  return {
    type: actionTypes.TOGGLE_SNACKBAR,
    payload: open,
  };
};

//Checks all rows for photo video etc

export const checkAllAttributesAction = (ready: boolean = false) => {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(loadingAction(true));
    const { mainState } = getState();
    let rows: IRow[];
    if (ready) {
      rows = mainState.rowsReady;
    } else {
      rows = mainState.rowsInWork;
    }

    if (rows.length > 0) {
      let check: IChek = {
        have_photo: false,
        have_video: false,
        have_description: false,
        have_attribute: false,
        have_photo_in_folder: false,
      };
      const newRows = await Promise.all(
        rows.map(async (row: IRow) => {
          try {
            const res = await axios.get(
              `${Urls.checkProductUrl}/${row.oneCId}/`
            );
            check = res.data;
          } catch (error) {
            dispatch(
              errorMessageAction({
                Error:
                  'Продукт с таким Один С ID Еще не заведен в итерфейс. Самое время его туда завести!',
              })
            );
            dispatch(toggleSnakbarAction(true));
            console.log(error.response.data);
          }

          const {
            have_photo,
            have_video,
            have_description,
            have_attribute,
            have_photo_in_folder,
          } = check;
          if (check) {
            row.photo = have_photo_in_folder;
            row.photoSite = have_photo;
            row.video = have_video;
            row.descSite = have_description;
            row.attibute = have_attribute;
            row.linkToSite = `https://angara77.com/porter-0520000611-${row.oneCId}/`;
          }
          return row;
        })
      );
      if (ready) {
        dispatch({
          type: actionTypes.UPDATE_ROWS_READY_ATTRS,
          payload: newRows,
        });
      } else {
        dispatch({ type: actionTypes.UPDATE_ROWS_ATTRS, payload: newRows });
      }
      dispatch(loadingAction(false));
    }
  };
};

// Loading status toggling

export const loadingAction = (isLoading: boolean) => {
  return {
    type: actionTypes.IS_LOADING,
    payload: isLoading,
  };
};

// save row to server

export const putRowToServerThunk = (row: IRow) => {
  return async (dispatch: Dispatch<any>) => {
    const res = await axios.put(`${Urls.fetchRowsUrl}${row.id}/`, row);
    dispatch({
      type: actionTypes.PUT_ROW_TO_SERVER,
      payload: res.data,
    });
    dispatch(checkAllAttributesAction());
  };
};

// Change description in specific row

export const changeDescriptionAction = (uuid: string, description: string) => {
  return {
    type: actionTypes.CHANGE_DESCRIPTION,
    payload: uuid,
    description: description,
  };
};
