const initialState = {
  levelPassed: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPLETE_LEVEL':
    case 'DURING_LEVEL':
      return {
        ...state,
        levelPassed: action.payload
      };
    default:
      return state;
  }
};

export default modalReducer;
