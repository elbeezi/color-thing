const CHARACTER_SCALE_FACTOR = 1 / 12;

// NOTE: these are all `keypress` codes, not `keydown` etc.
const KEYBINDINGS = {

  wasd: {
    UP: 119, // w
    DOWN: 115, // s
    LEFT: 97, // a
    RIGHT: 100 // d
  },

  ijkl: {
    UP: 105, // i
    DOWN: 107, // k
    LEFT: 106, // j
    RIGHT: 108 // l
  },

  vim: {
    UP: 107, // k
    DOWN: 106, // j
    LEFT: 104, // h
    RIGHT: 108 // l
  }
};

/* ___ */

const defaultKeyBindings = KEYBINDINGS.vim;

let currentKeyBindings = defaultKeyBindings;

const world = document.getElementById('game-world');

const getWorldHeight = () => world.getAttribute('height');
const getWorldWidth = () => world.getAttribute('width');

let worldHeight = getWorldHeight();
let worldWidth = getWorldWidth();

window.addEventListener('resize', () => {
  worldHeight = getWorldHeight();
  worldWidth = getWorldWidth();
});

let shortEdge = Math.min(worldWidth, worldHeight);

document.getElementById('key-bindings-mode').addEventListener('change', ({ target: { value }}) => {
  currentKeyBindings = KEYBINDINGS[value];
});

/* ___ */

const guy = Object.create(Character).create({
  domObject: document.getElementById('guy'),
  size: shortEdge * CHARACTER_SCALE_FACTOR
});

document.addEventListener('keypress', ({ keyCode }) => {
  const { UP, DOWN, LEFT, RIGHT } = currentKeyBindings;

  switch (keyCode) {

    // up
    case UP:
      const meTop = guy.y;
      const newTop = meTop - guy.size;
      if (newTop >= 0) {
        guy.y = newTop;
      }
      break;

    case DOWN:
      const meBottom = guy.y + guy.size;
      const newBottom = meBottom + guy.size;
      if (newBottom <= worldHeight) {
        guy.y = newBottom - guy.size;
      }
      break;

    case LEFT:
      const meLeft = +guy.domObject.getAttribute('x');
      const newLeft = meLeft - guy.size;
      if (newLeft >= 0) {
        guy.x = newLeft;
      }
      break;

    case RIGHT:
      const meRight = +guy.domObject.getAttribute('x') + guy.size;
      const newRight = meRight + guy.size;
      if (newRight <= worldWidth) {
        guy.x = newRight - guy.size;
      }
      break;
  }
});
