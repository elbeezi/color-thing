import { combineReducers } from 'redux';
import characterReducer from './character/characterReducer';
import gameProgressReducer from './game-progress/gameProgressReducer';
import levelProgressReducer from './level-progress/levelProgressReducer';

export default combineReducers({
  character: characterReducer,
  levelProgress: levelProgressReducer,
  gameProgress: gameProgressReducer,
});
