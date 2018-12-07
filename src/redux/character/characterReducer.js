import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import CHARACTER_ACTION_TYPES from './characterActionTypes';

const getCharacterState = state => state.character;

const getCharacterColor = createSelector(
  getCharacterState,
  characterState => characterState.color
);

const getCharacterPosition = createSelector(
  getCharacterState,
  characterState => characterState.position
);

const getCharacterVelocity = createSelector(
  getCharacterState,
  characterState => characterState.velocity
);

const getCharacterWidth = createSelector(
  getCharacterState,
  characterState => characterState.width
);

const getCharacterHeight = createSelector(
  getCharacterState,
  characterState => characterState.height
);

export {
  getCharacterColor,
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterWidth,
  getCharacterHeight
};

const initialPosition = {
  x: 0,
  y: 0
};

export const characterPositionReducer = handleActions({
  [CHARACTER_ACTION_TYPES.MOVE_CHARACTER_LEFT]: (state, action) => {
    return {
      ...state,
      x: Math.max(state.x - action.payload.velocity.x, action.payload.min.x)
    };
  },
  [CHARACTER_ACTION_TYPES.MOVE_CHARACTER_RIGHT]: (state, action) => {
    return {
      ...state,
      x: Math.min(state.x + action.payload.velocity.x, action.payload.max.x)
    };
  },
  [CHARACTER_ACTION_TYPES.MOVE_CHARACTER_UP]: (state, action) => {
    return {
      ...state,
      y: Math.max(state.y - action.payload.velocity.y, action.payload.min.y)
    };
  },
  [CHARACTER_ACTION_TYPES.MOVE_CHARACTER_DOWN]: (state, action) => {
    return {
      ...state,
      y: Math.min(state.y + action.payload.velocity.y, action.payload.max.y)
    };
  }
}, initialPosition);

const initialCharacterState = {
  width: 1,
  height: 1,
  position: { x: 0, y: 0 },
  velocity: { x: 1, y: 1 },
  color: '#000000'
};

const characterReducer = handleActions({
  [CHARACTER_ACTION_TYPES.SET_CHARACTER_POSITION]: (state, action) => {
    return {
      ...state,
      position: action.payload
    };
  },
  [CHARACTER_ACTION_TYPES.CHANGE_CHARACTER_COLOR]: (state, action) => {
    return {
      ...state,
      color: action.payload
    };
  }
}, initialCharacterState);

export default characterReducer;
