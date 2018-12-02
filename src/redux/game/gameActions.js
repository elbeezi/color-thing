const winGame = () => ({
  type: 'WIN_GAME',
  payload: 'victory'
});

const loseGame = () => ({
  type: 'LOSE_GAME',
  payload: 'failure'
});

const restartGame = () => ({
  type: 'RESTART_GAME',
  payload: null
});

export {
  winGame,
  loseGame,
  restartGame
};
