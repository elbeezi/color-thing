import {
  restartGame,
  startNextLevel
} from './gameProgressActions';
import {
  getCurrentLevelCharacterStartingColor,
  getCurrentLevelCharacterStartingPosition,
} from './gameProgressReducer';
import {
  changeCharacterColor,
  setCharacterPosition
} from '../character/characterActions';

export const restartGameAndUpdateCharacter = () => (dispatch, getState) => {
  dispatch(restartGame());
  dispatch(changeCharacterColor(getCurrentLevelCharacterStartingColor(getState())));
  dispatch(setCharacterPosition(getCurrentLevelCharacterStartingPosition(getState())));
};

export const startNextLevelAndUpdateCharacter = () => (dispatch, getState) => {
  dispatch(startNextLevel());
  dispatch(changeCharacterColor(getCurrentLevelCharacterStartingColor(getState())));
  dispatch(setCharacterPosition(getCurrentLevelCharacterStartingPosition(getState())));
};
