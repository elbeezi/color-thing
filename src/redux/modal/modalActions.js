const showModal = (levelPassed) => ({
  type: 'COMPLETE_LEVEL',
  payload: levelPassed
});

const hideModal = (levelPassed) => ({
  type: 'DURING_LEVEL',
  payload: levelPassed
});

export {
  showModal,
  hideModal
};
