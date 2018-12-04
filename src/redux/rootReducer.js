import { combineReducers } from 'redux';
import characterReducer from './character/characterReducer';
import gameReducer from './game/gameReducer';
import modalReducer from  './modal/modalReducer';

export default combineReducers({
  character: characterReducer,
  game: gameReducer,
  modal: modalReducer,
});
