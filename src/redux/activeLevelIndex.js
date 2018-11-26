const activeLevelIndexReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_LEVEL_INDEX':
      return state + 1;
    default:
      return state;
  }
};

export default activeLevelIndexReducer;
