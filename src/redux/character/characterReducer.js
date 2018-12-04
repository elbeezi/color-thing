import CHARACTER_ACTION_TYPES from './characterActionTypes';

const initialState = {
  width: 1,
  height: 1,
  position: { x: 0, y: 0 },
  velocity: { x: 1, y: 1 },
  color: '#000000'
};

const characterReducer = (state = initialState, action) => {

  switch (action.type) {
    case CHARACTER_ACTION_TYPES.SET_CHARACTER_POSITION:
      return {
        ...state,
        position: action.payload
      };

    case CHARACTER_ACTION_TYPES.CHANGE_CHARACTER_COLOR:
      return {
        ...state,
        color: action.payload
      };

    default:
      return state;
  }
};

export const getCharacter = state => state.character;

export default characterReducer;
