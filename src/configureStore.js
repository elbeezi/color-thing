import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';

const initialState = {
  character: {
    width: 1,
    height: 1,
    position: { x: 0, y: 0 },
    velocity: { x: 1, y: 1 },
    color: '#000000'
  }
};

const configureStore = () => createStore(rootReducer, initialState);

export default configureStore;
