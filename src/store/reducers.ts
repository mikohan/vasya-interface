import { combineReducers } from 'redux';
import { IRow } from '../interfaces';
import { MyAction } from './actions';
import { actionTypes } from './types';

export interface IMainState {
  rowsInWork: IRow[];
}

const initState: IMainState = {
  rowsInWork: [],
};

const mainReducer = (state: IMainState = initState, action: MyAction | any) => {
  switch (action.type) {
    case actionTypes.FETCH_ROWS_IN_WORK:
      return { ...state, rowsInWork: action.payload };
    case actionTypes.ADD_EMPTY_ROW:
      return { ...state, rowsInWork: [...state.rowsInWork, action.payload] };
    case actionTypes.DELETE_ROW:
      return {
        ...state,
        rowsInWork: state.rowsInWork.filter(
          (row: IRow) => row.id !== action.payload
        ),
      };
    case actionTypes.SET_ONE_C_ID:
      const index = state.rowsInWork.findIndex(
        (row: IRow) => row.id === action.payload
      );
      state.rowsInWork[index].oneCId = action.oneCId;

      return {
        ...state,
        rowsInWork: [...state.rowsInWork],
      };
    case actionTypes.TOGGLE_DONE:
      const idx = state.rowsInWork.findIndex(
        (row: IRow) => row.id === action.payload
      );
      state.rowsInWork[idx].done = action.isDone;
      return { ...state, rowsInWork: [...state.rowsInWork] };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  mainState: mainReducer,
});
