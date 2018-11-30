import { combineReducers } from 'redux';
import character from './character';
import victory from './victory';

export default combineReducers({
  character,
  victory
});
