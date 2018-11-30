const victoryReducer = (state = false, action) => {
  switch (action.type) {
    case 'WIN_GAME':
      return true;
    case 'START_GAME_OVER':
      return false;
    default:
      return state;
  }
};

export default victoryReducer;
