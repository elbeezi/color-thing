import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';

const logger = createLogger();

const middlewares = [thunk, logger];

const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default configureStore;
