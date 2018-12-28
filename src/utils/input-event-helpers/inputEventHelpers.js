const KEYBOARD_BINDINGS = {
  up: ['w', 'ArrowUp', 'k'],
  left: ['a', 'ArrowLeft', 'h'],
  down: ['s', 'ArrowDown', 'j'],
  right: ['d', 'ArrowRight', 'l']
};

// NOTE: this returns the first mapping found.
//   If a key is mapped to more than one action, we'll have a problem.
export const mapInputToDirection = (keyboardInput) => {
  return Object.keys(KEYBOARD_BINDINGS).find((action) => {
    return KEYBOARD_BINDINGS[action].includes(keyboardInput);
  });
};
