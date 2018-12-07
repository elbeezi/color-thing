import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import LEVEL_PROGRESS_ACTION_TYPES from './levelProgressActionTypes';

const getLevelProgress = state => state.levelProgress;

const getIsLevelComplete = createSelector(
  getLevelProgress,
  levelProgress => levelProgress.isLevelComplete
);

export {
  getIsLevelComplete
};

const initialState = {
  isLevelComplete: false
};

const levelProgressReducer = handleActions({
  [LEVEL_PROGRESS_ACTION_TYPES.COMPLETE_LEVEL]: state => {
    return {
      ...state,
      isLevelComplete: true
    };
  },
  [LEVEL_PROGRESS_ACTION_TYPES.START_LEVEL]: state => {
    return {
      ...state,
      isLevelComplete: false
    };
  }
}, initialState);

export default levelProgressReducer;
