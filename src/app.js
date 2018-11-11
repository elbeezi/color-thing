import {
  generateRegion
} from './utils/generate-region/generateRegion';
import {
  findCharacterInDOM,
  getRGBObj,
  moveTowardsColor,
  stringifyRGB
} from './utils/utils';
import { mapColor } from './utils/color-mapper/colorMapper';
import {
  keyBindings,
  xVelocity,
  yVelocity,
  CHARACTER_HEIGHT,
  CHARACTER_WIDTH
} from './variables/commonVariables';
import levelProps from './variables/levels/level1';

import './app.css';

const charXMax = levelProps.worldWidth - CHARACTER_WIDTH;
const charYMax = levelProps.worldHeight - CHARACTER_HEIGHT;

const regionsProps = levelProps.regions.map(regionCoords => {
  return generateRegion(...regionCoords);
});

const worldProps = {
  id    : 'world',
  class : 'world',
  x     : 0,
  y     : 0,
  width : levelProps.worldWidth,
  height: levelProps.worldHeight
};

const characterProps = {
  id            : 'character',
  height        : CHARACTER_HEIGHT,
  width         : CHARACTER_WIDTH,
  x             : levelProps.characterStartingX,
  y             : levelProps.characterStartingY,
  stroke        : 'purple',
  'stroke-width': '2px',
  fill          : mapColor('white')
};

const initializeWorld = ({ dom, worldProps, characterProps }) => {
  const WrappingDiv = dom.createElement('div');
  dom.body.appendChild(WrappingDiv);

  const World = dom.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Object.keys(worldProps).map(propKey => {
    World.setAttribute(propKey, worldProps[propKey]);
  });
  WrappingDiv.appendChild(World);

  regionsProps.map(regionProps => {
    const Region = dom.createElementNS('http://www.w3.org/2000/svg', 'rect');
    Object.keys(regionProps).map(propKey => {
      Region.setAttribute(propKey, regionProps[propKey]);
    });
    World.appendChild(Region);
  });

  const Character = dom.createElementNS('http://www.w3.org/2000/svg', 'rect');
  Object.keys(characterProps).map(propKey => {
    Character.setAttribute(propKey, characterProps[propKey]);
  });
  World.appendChild(Character);
};


// Initialization
const initProps = {
  dom: document,
  worldProps,
  characterProps
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

  const matchingRegion = regionsProps.find(region => {
    return region.x === newCharacterX && region.y === newCharacterY;
  });

  const colorToMoveTowards = matchingRegion ? matchingRegion.color : 'white';

  const characterColorObj = getRGBObj(Character().getAttribute('fill'));
  const newColorObj = moveTowardsColor(characterColorObj, colorToMoveTowards);

  const colorString = stringifyRGB(newColorObj);
  Character().setAttribute('fill', colorString);
});
