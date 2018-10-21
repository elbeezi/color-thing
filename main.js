const WORLD_HEIGHT = 300;
const WORLD_WIDTH = 300;

const TILE_SIZE = 100;

const REGION_WIDTH = TILE_SIZE;
const REGION_HEIGHT = TILE_SIZE;

const CHARACTER_WIDTH = TILE_SIZE;
const CHARACTER_HEIGHT = TILE_SIZE;

const colorMap = {
  red: 'rgb(255, 0, 0)',
  green: 'rgb(0, 255, 0)',
  blue: 'rgb(0, 0, 255)',
  white: 'rgb(255, 255, 255)'
};

const regions = [
  { x: 0, y: 0, color: 'blue', fill: colorMap['blue'], id: 'water', width: REGION_WIDTH, height: REGION_HEIGHT },
  { x: 0, y: 200, color: 'green', fill: colorMap['green'], id: 'forest', width: REGION_WIDTH, height: REGION_HEIGHT },
  { x: 200, y: 0, color: 'green', fill: colorMap['green'], id: 'grass', width: REGION_WIDTH, height: REGION_HEIGHT },
  { x: 200, y: 200, color: 'red', fill: colorMap['red'], id: 'lava', width: REGION_WIDTH, height: REGION_HEIGHT }
];

const characterObj = {
  id: 'character',
  x: CHARACTER_WIDTH,
  y: CHARACTER_HEIGHT,
  stroke: 'purple',
  'stroke-width': '5px',
  fill: 'rgb(255, 255, 255)'
};

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

  regions.map(region => {
    // <rect id={region.id} width={REGION_WIDTH} height={REGION_HEIGHT} x={region.x} y={region.y} fill={colorMap[region.fill]} />
    const Region = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    Object.keys(region).map(regionKey => {
      Region.setAttribute(regionKey, region[regionKey]);
    });
    World().appendChild(Region);
  });

  const CharacterRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  Object.keys(characterObj).map(characterKey => {
    CharacterRect.setAttribute(characterKey, characterObj[characterKey]);
  });
  World().appendChild(CharacterRect);

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

const incrementColor = (characterColorObj, colorString, scaleInterval=50) => {
  characterColorObj[colorString] = Math.min(characterColorObj[colorString] + scaleInterval, 255);
};

const decrementColor = (characterColorObj, colorString, scaleInterval=50) => {
  characterColorObj[colorString] = Math.max(characterColorObj[colorString] - scaleInterval, 0);
};

const moveTowardsColor = (characterColorObj, regionColorString) => {
  switch (regionColorString) {
    case "red":
      incrementColor(characterColorObj, "red");
      decrementColor(characterColorObj, "green");
      decrementColor(characterColorObj, "blue");
      break;
    case "green":
      decrementColor(characterColorObj, "red");
      incrementColor(characterColorObj, "green");
      decrementColor(characterColorObj, "blue");
      break;
    case "blue":
      decrementColor(characterColorObj, "red");
      decrementColor(characterColorObj, "green");
      incrementColor(characterColorObj, "blue");
      break;
    case "white":
      incrementColor(characterColorObj, "red", 25);
      incrementColor(characterColorObj, "green", 25);
      incrementColor(characterColorObj, "blue", 25);
      break;
  }
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

  const matchingRegion = regions.find(region => {
    return region.x === newCharacterX && region.y === newCharacterY;
  });

  if (matchingRegion) {
    moveTowardsColor(characterColorObj, matchingRegion.color);
  } else {
    moveTowardsColor(characterColorObj, 'white');
  }

  const colorString = stringifyRGB(characterColorObj);
  console.log(colorString); 
  Character().setAttribute("fill", colorString);
});
