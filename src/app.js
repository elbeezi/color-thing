import {
  findCharacterInDOM,
  getRGBObj,
  moveTowardsColor,
  stringifyRGB
} from './utils.js';
import {
  characterProps,
  charXMax,
  charYMax,
  keyBindings,
  regionsProps,
  worldProps,
  xVelocity,
  yVelocity
} from './variables.js';

import './app.css';

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

  const characterColorObj = getRGBObj(Character().getAttribute('fill'));

  const matchingRegion = regionsProps.find(region => {
    return region.x === newCharacterX && region.y === newCharacterY;
  });

  const colorToMoveTowards = matchingRegion ? matchingRegion.color : 'white';

  const newColorObj = moveTowardsColor(characterColorObj, colorToMoveTowards);

  const colorString = stringifyRGB(newColorObj);
  console.log(colorString);
  Character().setAttribute('fill', colorString);
});
