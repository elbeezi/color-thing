import { createAction } from 'redux-actions';
import GAME_PROGRESS_ACTION_TYPES from './gameProgressActionTypes';

const loseGame = createAction(GAME_PROGRESS_ACTION_TYPES.LOSE_GAME);
const restartGame = createAction(GAME_PROGRESS_ACTION_TYPES.RESTART_GAME);
const completeLevel = createAction(GAME_PROGRESS_ACTION_TYPES.COMPLETE_LEVEL);
const startNextLevel = createAction(GAME_PROGRESS_ACTION_TYPES.START_NEXT_LEVEL);

export {
  loseGame,
  restartGame,
  completeLevel,
  startNextLevel
};
