import { combineReducers } from 'redux';
import character from './characterReducer';
import isGateBlocked from './isGateBlockedReducer';
import victory from './victoryReducer';
import showModal from './modalReducer'

export default combineReducers({
  character,
  isGateBlocked,
  victory,
  showModal,
});
