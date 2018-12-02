import { combineReducers } from 'redux';
import characterReducer from './character/characterReducer';
import gameReducer from './game/gameReducer';
import gateReducer from './gate/gateReducer';
import modalReducer from  './modal/modalReducer';

export default combineReducers({
  character: characterReducer,
  game: gameReducer,
  gate: gateReducer,
  modal: modalReducer,
});
