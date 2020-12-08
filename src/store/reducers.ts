import { combineReducers } from 'redux';

const mainReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  mainState: mainReducer,
});
