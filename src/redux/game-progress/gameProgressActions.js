import { createAction } from 'redux-actions';
import GAME_PROGRESS_ACTION_TYPES from './gameProgressActionTypes';

const winGame = createAction(GAME_PROGRESS_ACTION_TYPES.WIN_GAME);
const loseGame = createAction(GAME_PROGRESS_ACTION_TYPES.LOSE_GAME);
const restartGame = createAction(GAME_PROGRESS_ACTION_TYPES.RESTART_GAME);

export {
  winGame,
  loseGame,
  restartGame
};
