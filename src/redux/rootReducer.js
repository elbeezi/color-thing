import { combineReducers } from 'redux';
import characterReducer from './character/characterReducer';
import gameReducer from './game/gameReducer';
import gateReducer from './gate/gateReducer';

export default combineReducers({
  character: characterReducer,
  game: gameReducer,
  gate: gateReducer,
});
