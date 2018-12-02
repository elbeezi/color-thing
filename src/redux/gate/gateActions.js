// FIXME: a Gate shouldn't know if it's blocked.
const setGateBlocked = (isBlocked) => ({
  type: 'SET_GATE_BLOCKED',
  payload: isBlocked
});

export {
  setGateBlocked
};
