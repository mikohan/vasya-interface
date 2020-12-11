import { combineReducers } from 'redux';
import { IRow } from '../interfaces';
import { MyAction } from './actions';

import { actionTypes } from './types';

export interface IMainState {
  rowsInWork: IRow[];
  rowsReady: IRow[];
  errorMessage: any;
  openSnakbar: boolean;
  isLoading: boolean;
}
export interface IState {
  mainState: IMainState;
}

const initState: IMainState = {
  rowsInWork: [],
  rowsReady: [],
  errorMessage: null,
  openSnakbar: false,
  isLoading: false,
};

const mainReducer = (state: IMainState = initState, action: MyAction | any) => {
  switch (action.type) {
    case actionTypes.FETCH_ROWS_IN_WORK:
      return { ...state, rowsInWork: action.payload };
    case actionTypes.FETCH_ROWS_READY:
      return { ...state, rowsReady: action.payload };
    case actionTypes.ADD_EMPTY_ROW:
      return { ...state, rowsInWork: [...state.rowsInWork, action.payload] };
    case actionTypes.DELETE_ROW:
      return {
        ...state,
        rowsInWork: state.rowsInWork.filter(
          (row: IRow) => row.uuid !== action.payload
        ),
      };
    case actionTypes.SET_ONE_C_ID:
      const index = state.rowsInWork.findIndex(
        (row: IRow) => row.uuid === action.payload
      );
      state.rowsInWork[index].oneCId = action.oneCId;

      return {
        ...state,
        rowsInWork: [...state.rowsInWork],
      };
    case actionTypes.TOGGLE_DONE:
      const idx = state.rowsInWork.findIndex(
        (row: IRow) => row.uuid === action.payload.uuid
      );
      state.rowsInWork[idx].isDone = action.isDone;
      return { ...state, rowsInWork: [...state.rowsInWork] };
    case actionTypes.FETCH_DATA_A77:
      return { ...state };
    case actionTypes.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case actionTypes.TOGGLE_SNACKBAR:
      return { ...state, openSnakbar: action.payload };
    case actionTypes.UPDATE_ROWS_ATTRS:
      return { ...state, rowsInWork: action.payload };
    case actionTypes.UPDATE_ROWS_READY_ATTRS:
      return { ...state, rowsReady: action.payload };
    case actionTypes.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.CHANGE_DESCRIPTION:
      const descRow = state.rowsInWork.findIndex(
        (row: IRow) => row.uuid === action.payload
      );
      state.rowsInWork[descRow].description = action.description;
      return {
        ...state,
        rowsInWork: [...state.rowsInWork],
      };
    case actionTypes.PUT_ROW_TO_SERVER:
      const changeRow = state.rowsInWork.findIndex(
        (row: IRow) => row.uuid === action.payload.uuid
      );
      state.rowsInWork[changeRow] = action.payload;
      return {
        ...state,
        rowsInWork: [...state.rowsInWork],
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  mainState: mainReducer,
});
