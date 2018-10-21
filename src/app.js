import {
  findCharacterInDOM,
  findWorldInDOM,
  getRGBObj,
  moveTowardsColor,
  stringifyRGB
} from './utils.js';
import {
  CHARACTER_WIDTH,
  CHARACTER_HEIGHT,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  characterObj,
  charXMax,
  charYMax,
  keyBindings,
  regions,
  xVelocity,
  yVelocity
} from './variables.js';


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

  const characterColorObj = getRGBObj(Character().getAttribute('fill'));

  const matchingRegion = regions.find(region => {
    return region.x === newCharacterX && region.y === newCharacterY;
  });

  const colorToMoveTowards = matchingRegion ? matchingRegion.color : 'white';

  const newColorObj = moveTowardsColor(characterColorObj, colorToMoveTowards);

  const colorString = stringifyRGB(newColorObj);
  console.log(colorString);
  Character().setAttribute('fill', colorString);
});
