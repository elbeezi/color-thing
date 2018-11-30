import keyBindings from '../../utils/key-bindings/keyBindings';

const getAdjacentCharacterPositions = (character, maxCoordinates) => {
  const {
    position,
    velocity
  } = character;

  return {
    left: {
      x: Math.max(position.x - velocity.x, 0),
      y: position.y
    },
    right: {
      x: Math.min(position.x + velocity.x, maxCoordinates.x),
      y: position.y
    },
    up: {
      x: position.x,
      y: Math.max(position.y - velocity.y, 0)
    },
    down: {
      x: position.x,
      y: Math.min(position.y + velocity.y, maxCoordinates.y)
    }
  };
};

export const getAdjacentCharacterPosition = (character, max, keyCode) => {
  const { UP, DOWN, LEFT, RIGHT } = keyBindings;

  const {
    position,
    velocity
  } = character;

  let newCharacterPosition;

  // TODO: switch over strings (e.g. 'LEFT') instead? Like Redux action handlers?
  switch (keyCode) {
    case LEFT:
      newCharacterPosition = {
        x: Math.max(position.x - velocity.x, 0),
        y: position.y
      };
      break;

    case RIGHT:
      newCharacterPosition = {
        x: Math.min(position.x + velocity.x, max.x),
        y: position.y
      };
      break;

    case UP:
      newCharacterPosition = {
        x: position.x,
        y: Math.max(position.y - velocity.y, 0)
      };
      break;

    case DOWN:
      newCharacterPosition = {
        x: position.x,
        y: Math.min(position.y + velocity.y, max.y)
      };
      break;

    default:
      // A non-movement key was pressed, so don't do anything.
      newCharacterPosition = position;
  }

  return newCharacterPosition;
};

export default getAdjacentCharacterPositions;
