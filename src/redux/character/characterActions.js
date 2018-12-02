const changeCharacterColor = (color) => ({
  type: 'CHANGE_CHARACTER_COLOR',
  payload: color
});

const setCharacterPosition = (position) => ({
  type: 'SET_CHARACTER_POSITION',
  payload: position
});

export {
  setCharacterPosition,
  changeCharacterColor
};
