import { createAction } from 'redux-actions';
import CHARACTER_ACTION_TYPES from './characterActionTypes';

const changeCharacterColor = createAction(CHARACTER_ACTION_TYPES.CHANGE_CHARACTER_COLOR);
const setCharacterPosition = createAction(CHARACTER_ACTION_TYPES.SET_CHARACTER_POSITION);

export {
  setCharacterPosition,
  changeCharacterColor
};
