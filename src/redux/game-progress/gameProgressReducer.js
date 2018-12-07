import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import GAME_PROGRESS_ACTION_TYPES from './gameProgressActionTypes';

const getGameProgress = state => state.gameProgress;

const getGameOverState = createSelector(
  getGameProgress,
  gameProgress => gameProgress.gameOverState
);

const getIsGameOver = createSelector(
  getGameOverState,
  gameOverState => !!gameOverState
);

const getIsGameWon = createSelector(
  getGameOverState,
  gameOverState => gameOverState === 'victory'
);

const getIsGameLost = createSelector(
  getGameOverState,
  gameOverState => gameOverState === 'failure'
);

export {
  getIsGameOver,
  getIsGameWon,
  getIsGameLost
};

const initialState = {
  gameOverState: null
};

const gameProgressReducer = handleActions({
  [GAME_PROGRESS_ACTION_TYPES.WIN_GAME]: state => {
    return {
      ...state,
      gameOverState: 'victory'
    };
  },
  [GAME_PROGRESS_ACTION_TYPES.LOSE_GAME]: state => {
    return {
      ...state,
      gameOverState: 'failure'
    };
  },
  [GAME_PROGRESS_ACTION_TYPES.RESTART_GAME]: state => {
    return {
      ...state,
      gameOverState: null
    };
  },
}, initialState);

export default gameProgressReducer;
