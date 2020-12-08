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

const mainReducer = (state: IMainState = initState, action: MyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_ROWS_IN_WORK:
      return { ...state, rowsInWork: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  mainState: mainReducer,
});
