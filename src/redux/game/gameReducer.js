const initialState = {
  gameOverState: null
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WIN_GAME':
    case 'LOSE_GAME':
    case 'RESTART_GAME':
      return {
        ...state,
        gameOverState: action.payload
      };
    default:
      return state;
  }
};

export default gameReducer;
