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

export default getAdjacentCharacterPositions;
