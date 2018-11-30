const characterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MOVE_CHARACTER':
      return {
        ...state,
        position: action.position
      };
    case 'CHANGE_CHARACTER_COLOR':
      return {
        ...state,
        color: action.color
      };
    default:
      return state;
  }
};

export default characterReducer;
