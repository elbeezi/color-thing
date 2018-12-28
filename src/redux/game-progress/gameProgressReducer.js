import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import GAME_PROGRESS_ACTION_TYPES from './gameProgressActionTypes';

import levelConfigs from '../../level-configs/levelConfigs';

const getFinalLevelIndex = () => levelConfigs.length - 1;

const getGameProgressState = state => state.gameProgress;

export const getCurrentLevelIndex = createSelector(
  getGameProgressState,
  (gameProgressState) => gameProgressState.currentLevelIndex
);

export const getCurrentLevelConfig = createSelector(
  getCurrentLevelIndex,
  (currentLevelIndex) => levelConfigs[currentLevelIndex]
);

export const getCurrentLevelCharacterStartingColor = createSelector(
  getCurrentLevelConfig,
  (currentLevelConfig) => currentLevelConfig.characterStartingColor
);

export const getCurrentLevelCharacterStartingPosition = createSelector(
  getCurrentLevelConfig,
  (currentLevelConfig) => currentLevelConfig.characterStartingPosition
);

export const getIsLevelComplete = createSelector(
  getGameProgressState,
  (gameProgressState) => gameProgressState.isLevelComplete
);

const getGameOverState = createSelector(
  getGameProgressState,
  gameProgress => gameProgress.gameOverState
);

export const getIsGameLost = createSelector(
  getGameOverState,
  gameOverState => gameOverState === 'failure'
);

export const getIsGameWon = createSelector(
  getGameOverState,
  gameOverState => gameOverState === 'victory'
);

export const getIsGameOver = createSelector(
  getIsGameLost,
  getIsGameWon,
  (isGameLost, isGameWon) => isGameLost || isGameWon
);

const initialState = {
  currentLevelIndex: 0,
  isLevelComplete: false,
  gameOverState: null
};

const gameProgressReducer = handleActions({
  [GAME_PROGRESS_ACTION_TYPES.COMPLETE_LEVEL]: (state) => {
    const isFinalLevel = state.currentLevelIndex === getFinalLevelIndex(state);
    return {
      ...state,
      isLevelComplete: true,
      gameOverState: isFinalLevel ? 'victory' : state.gameOverState
    };
  },
  [GAME_PROGRESS_ACTION_TYPES.START_NEXT_LEVEL]: (state) => {
    return {
      ...state,
      currentLevelIndex: state.currentLevelIndex + 1,
      isLevelComplete: false
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
      currentLevelIndex: 0,
      isLevelComplete: false,
      gameOverState: null
    };
  }
}, initialState);

export default gameProgressReducer;
