const WORLD_HEIGHT = 480;
const WORLD_WIDTH = 720;

const CHARACTER_WIDTH = 40;
const CHARACTER_HEIGHT = CHARACTER_WIDTH;

// NOTE: these are all `keydown` codes
const keyBindings = {
  UP   : 87, // w
  LEFT : 65, // a
  DOWN : 83, // s
  RIGHT: 68  // d
};

const xVelocity = CHARACTER_WIDTH;
const yVelocity = CHARACTER_HEIGHT;

const charXMax = WORLD_WIDTH - CHARACTER_WIDTH;
const charYMax = WORLD_HEIGHT - CHARACTER_HEIGHT;

const getWorld = dom => dom.getElementById('world');
const getCharacter = dom => dom.getElementById('character');

const initializeWorld = ({ dom, worldProps, characterProps }) => {
  const World     = getWorld(dom);
  const Character = getCharacter(dom);

  World.setAttribute('height', worldProps.height);
  World.setAttribute('width', worldProps.width);

  Character.setAttribute('height', characterProps.height);
  Character.setAttribute('width', characterProps.width);
};


const initProps = {
  dom: document,
  worldProps: {
    height: WORLD_HEIGHT,
    width : WORLD_WIDTH
  },
  characterProps: {
    height: CHARACTER_HEIGHT,
    width: CHARACTER_WIDTH
  }
};

initializeWorld(initProps);


document.addEventListener('keydown', ({ keyCode }) => {
  const { UP, DOWN, LEFT, RIGHT } = keyBindings;

  const Character = getCharacter(document);

  const characterX = parseFloat(Character.getAttribute('x'));
  const characterY = parseFloat(Character.getAttribute('y'));

  const left  = characterX - xVelocity;
  const right = characterX + xVelocity;
  const up    = characterY - yVelocity;
  const down  = characterY + yVelocity;

  switch (keyCode) {

    case LEFT:
      Character.setAttribute('x', Math.max(left, 0));
      break;

    case RIGHT:
      Character.setAttribute('x', Math.min(right, charXMax));
      break;

    case UP:
      Character.setAttribute('y', Math.max(up, 0));
      break;

    case DOWN:
      Character.setAttribute('y', Math.min(down, charYMax));
      break;
  }
});
