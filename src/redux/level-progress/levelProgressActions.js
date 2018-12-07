import { createAction } from 'redux-actions';
import LEVEL_PROGRESS_ACTION_TYPES from './levelProgressActionTypes';

const completeLevel = createAction(LEVEL_PROGRESS_ACTION_TYPES.COMPLETE_LEVEL);
const startLevel = createAction(LEVEL_PROGRESS_ACTION_TYPES.START_LEVEL);

export {
  completeLevel,
  startLevel
};
