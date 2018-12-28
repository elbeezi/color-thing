import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import CHARACTER_ACTION_TYPES from './characterActionTypes';
import { getCurrentLevelConfig } from '../game-progress/gameProgressReducer';

const getCharacterState = state => state.character;

const getCharacterMax = createSelector(
  getCharacterState,
  getCurrentLevelConfig,
  (character, level) => ({
    x: level.width - character.width,
    y: level.height - character.height
  })
);

const getCharacterMin = () => ({
  x: 0,
  y: 0
});

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


const getCharacterLeft = createSelector(
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterMin,
  (position, velocity, min) => ({
    x: Math.max(position.x - velocity.x, min.x),
    y: position.y
  })
);

const getCharacterRight = createSelector(
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterMax,
  (position, velocity, max) => ({
    x: Math.min(position.x + velocity.x, max.x),
    y: position.y
  })
);

const getCharacterUp = createSelector(
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterMin,
  (position, velocity, min) => ({
    x: position.x,
    y: Math.max(position.y - velocity.y, min.y)
  })
);

const getCharacterDown = createSelector(
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterMax,
  (position, velocity, max) => ({
    x: position.x,
    y: Math.min(position.y + velocity.y, max.y)
  })
);

export const getCharacterAdjacencies = createSelector(
  getCharacterLeft,
  getCharacterRight,
  getCharacterUp,
  getCharacterDown,
  (left, right, up, down) => ({ left, right, up, down })
);

export {
  getCharacterColor,
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterWidth,
  getCharacterHeight
};

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
