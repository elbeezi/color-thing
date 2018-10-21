const WORLD_HEIGHT = 300;
const WORLD_WIDTH = 300;

const CHARACTER_WIDTH = 100;
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

const findWorldInDOM = dom => dom.getElementById('world');
const findCharacterInDOM = dom => dom.getElementById('character');

const initializeWorld = ({ dom, worldProps, characterProps }) => {
  const World     = () => findWorldInDOM(dom);
  const Character = () => findCharacterInDOM(dom);

  World().setAttribute('height', worldProps.height);
  World().setAttribute('width', worldProps.width);

  Character().setAttribute('height', characterProps.height);
  Character().setAttribute('width', characterProps.width);
};

const getRGBObj = colorString => {
  const colorsOnly = colorString.slice(4, colorString.length - 1);
  const colorsArr = colorsOnly.split(', ');

  return {
    red: parseInt(colorsArr[0], 10),
    green: parseInt(colorsArr[1], 10),
    blue: parseInt(colorsArr[2], 10)
  };
};

const stringifyRGB = ({ red, green, blue }) => {
  return `rgb(${red}, ${green}, ${blue})`;
};

const incrementColor = (characterObj, colorString, scaleInterval=50) => {
  characterObj[colorString] = Math.min(characterObj[colorString] + scaleInterval, 255);
};

const decrementColor = (characterObj, colorString, scaleInterval=50) => {
  characterObj[colorString] = Math.max(characterObj[colorString] - scaleInterval, 0);
};


// Initialization

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

  const Character = () => findCharacterInDOM(document);

  const characterX = parseFloat(Character().getAttribute('x'));
  const characterY = parseFloat(Character().getAttribute('y'));

  const left  = characterX - xVelocity;
  const right = characterX + xVelocity;
  const up    = characterY - yVelocity;
  const down  = characterY + yVelocity;

  switch (keyCode) {
    case LEFT:
      Character().setAttribute('x', Math.max(left, 0));
      break;

    case RIGHT:
      Character().setAttribute('x', Math.min(right, charXMax));
      break;

    case UP:
      Character().setAttribute('y', Math.max(up, 0));
      break;

    case DOWN:
      Character().setAttribute('y', Math.min(down, charYMax));
      break;

    default:
      return;
  }

  const newCharacterX = parseFloat(Character().getAttribute('x'));
  const newCharacterY = parseFloat(Character().getAttribute('y'));

  if (characterX === newCharacterX && characterY === newCharacterY) {
    // Character didn't move, so don't do anything.
    return;
  }

  let characterColorObj = getRGBObj(Character().getAttribute('fill'));

  if (newCharacterX === 0 && newCharacterY === 0) {
    incrementColor(characterColorObj, "blue");
    decrementColor(characterColorObj, "red");
    decrementColor(characterColorObj, "green");
  }
  else if (newCharacterX === 0 && newCharacterY === 200) {
    incrementColor(characterColorObj, "red");
    incrementColor(characterColorObj, "green");
    decrementColor(characterColorObj, "blue");
  }
  else if (newCharacterX === 200 && newCharacterY === 0) {
    incrementColor(characterColorObj, "green");
    decrementColor(characterColorObj, "red");
    decrementColor(characterColorObj, "blue");
  }
  else if (newCharacterX === 200 && newCharacterY === 200) {
    incrementColor(characterColorObj, "red");
    decrementColor(characterColorObj, "green");
    decrementColor(characterColorObj, "blue");
  }
  else {
    incrementColor(characterColorObj, "red", 20);
    incrementColor(characterColorObj, "green", 20);
    incrementColor(characterColorObj, "blue", 20);
  }

  const colorString = stringifyRGB(characterColorObj);
  console.log(colorString);
  Character().setAttribute("fill", colorString);
});
