// FIXME: these bindings should be coupled more closely to their action types.
const KEYBOARD_BINDINGS = {
  MOVE_CHARACTER_UP: ['w', 'ArrowUp', 'k'],
  MOVE_CHARACTER_LEFT: ['a', 'ArrowLeft', 'h'],
  MOVE_CHARACTER_DOWN: ['s', 'ArrowDown', 'j'],
  MOVE_CHARACTER_RIGHT: ['d', 'ArrowRight', 'l']
};

// NOTE: this returns the first mapping found.
//   If a key is mapped to more than one action, we'll have a problem.
export const getActionTypeFromKeyboardInput = (keyboardInput) => {
  return Object.keys(KEYBOARD_BINDINGS).find((action) => {
    return KEYBOARD_BINDINGS[action].includes(keyboardInput);
  });
};
