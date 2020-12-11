import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { IState, rootReducer } from './reducers';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<IState, any>))
);
