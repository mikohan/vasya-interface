import { combineReducers } from 'redux';
import { IRow } from '../interfaces';
import { MyAction } from './actions';

export interface IMainState {
  rowsInWork: IRow[];
}

const mainReducer = (state: IMainState, action: MyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  mainState: mainReducer,
});
