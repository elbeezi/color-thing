import {
  generateRegion
} from './utils/generate-region/generateRegion';
import {
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

const initialRegionsProps = levelProps.regions.map(regionCoords => {
  return generateRegion(...regionCoords);
});

const initialWorldProps = {
  x     : 0,
  y     : 0,
  width : levelProps.worldWidth,
  height: levelProps.worldHeight
};

const initialCharacterProps = {
  height        : CHARACTER_HEIGHT,
  width         : CHARACTER_WIDTH,
  x             : levelProps.characterStartingX,
  y             : levelProps.characterStartingY,
  stroke        : 'purple',
  'stroke-width': '2px',
  fill          : mapColor('white')
};

const render = ({ world, regions, character }) => {
  const WrappingDivOld = document.getElementsByClassName('WrappingDiv')[0];
  WrappingDivOld && document.body.removeChild(WrappingDivOld);

  const WrappingDiv = document.createElement('div');
  WrappingDiv.setAttribute('class', 'WrappingDiv');
  document.body.appendChild(WrappingDiv);

  const World = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Object.keys(world).map(propKey => {
    World.setAttribute('class', 'World');
    World.setAttribute(propKey, world[propKey]);
  });
  WrappingDiv.appendChild(World);

  regions.map((regionProps, i) => {
    const Region = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    Region.setAttribute('class', `Region${i}`);
    Object.keys(regionProps).map(propKey => {
      Region.setAttribute(propKey, regionProps[propKey]);
    });
    World.appendChild(Region);
  });

  const Character = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  Character.setAttribute('class', 'Character');
  Object.keys(character).map(propKey => {
    Character.setAttribute(propKey, character[propKey]);
  });
  World.appendChild(Character);
};


// Initialization

const state = {
  character: initialCharacterProps,
  regions  : initialRegionsProps,
  world    : initialWorldProps
};

const initializeWorld = () => render(state);

// via https://developer.mozilla.org/en-US/docs/Web/Events/documentContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWorld);
} else {  // `documentContentLoaded` already fired
  initializeWorld();
}


document.addEventListener('keydown', ({ keyCode }) => {
  const { UP, DOWN, LEFT, RIGHT } = keyBindings;

  const characterX    = state.character.x;
  const characterY    = state.character.y;
  const characterFill = state.character.fill;

  const left  = characterX - xVelocity;
  const right = characterX + xVelocity;
  const up    = characterY - yVelocity;
  const down  = characterY + yVelocity;

  const characterPropsToSet = {
    x   : characterX,
    y   : characterY,
    fill: characterFill
  };

  switch (keyCode) {
    case LEFT:
      characterPropsToSet.x = Math.max(left, 0);
      break;

    case RIGHT:
      characterPropsToSet.x = Math.min(right, charXMax);
      break;

    case UP:
      characterPropsToSet.y = Math.max(up, 0);
      break;

    case DOWN:
      characterPropsToSet.y = Math.min(down, charYMax);
      break;

    default:
      // A non-movement key was pressed, so don't do anything.
      return;
  }

  if (characterX === characterPropsToSet.x && characterY === characterPropsToSet.y) {
    // Character didn't move, so don't do anything.
    return;
  }

  const matchingRegion = state.regions.find(region => {
    return region.x === characterPropsToSet.x && region.y === characterPropsToSet.y;
  });

  const colorToMoveTowards = matchingRegion ? matchingRegion.color : 'white';

  const characterColorObj = getRGBObj(characterFill);
  const newColorObj = moveTowardsColor(characterColorObj, colorToMoveTowards);

  characterPropsToSet.fill = stringifyRGB(newColorObj);

  state.character = {
    ...state.character,
    ...characterPropsToSet
  };

  render(state);
});
