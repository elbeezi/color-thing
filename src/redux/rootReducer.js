import { combineReducers } from 'redux';
import characterReducer from './character/characterReducer';
import gameProgressReducer from './game-progress/gameProgressReducer';

export default combineReducers({
  character: characterReducer,
  gameProgress: gameProgressReducer,
});
