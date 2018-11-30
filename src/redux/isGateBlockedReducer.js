const isGateBlockedReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_GATE_BLOCKED':
      return true;
    case 'SET_GATE_UNBLOCKED':
      return false;
    default:
      return state;
  }
};

export default isGateBlockedReducer;
