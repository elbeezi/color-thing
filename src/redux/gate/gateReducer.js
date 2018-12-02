const initialState = {
  isBlocked: true
};

const gateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GATE_BLOCKED':
      return {
        ...state,
        isBlocked: action.payload
      };
    default:
      return state;
  }
};

export default gateReducer;
