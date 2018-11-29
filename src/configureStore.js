import { createStore } from 'redux';
import rootReducer from './redux/rootReducer';

const configureStore = () => createStore(rootReducer);

export default configureStore;
