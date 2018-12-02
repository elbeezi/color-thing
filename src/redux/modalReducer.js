const modalReducer = (state = false, action) => {
  switch (action.type) {
    case 'COMPLETE_LEVEL':
      return true;
    case 'DURING_LEVEL':
      return false;
    default:
      return state;
  }
};

export default modalReducer;
