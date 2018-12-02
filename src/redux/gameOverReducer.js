const gameOverReducer = (state = null, action) => {
  switch (action.type) {
    case 'WIN_GAME':
      return 'VICTORY';
    case 'LOSE_GAME':
      return 'FAILURE';
    case 'RESTART_GAME':
      return null;
    default:
      return state;
  }
};

export default gameOverReducer;
