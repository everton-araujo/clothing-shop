import { createStore, applyMiddleware } from 'redux-store';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = creteStore(rootReducer, applyMiddleware(...middlewares));

export default store;
