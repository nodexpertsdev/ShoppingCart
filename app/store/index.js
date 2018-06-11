import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { middleware } from '../utils/redux';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    middleware,
    logger,
  ),
);

export default store;
