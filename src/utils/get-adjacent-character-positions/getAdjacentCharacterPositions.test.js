import getAdjacentCharacterPositions from './getAdjacentCharacterPositions';

describe('getAdjacentCharacterPositions', () => {
  it('returns coordinates for positions left, right, up, and down from the given character\'s position between the standard origin (0,0) and the given max coordinates', () => {
    const character = {
      position: { x: 1, y: 500 },
      velocity: { x: 2, y: 2 }
    };
    const maxCoordinates = { x: 50, y: 501 };

    const result = getAdjacentCharacterPositions(character, maxCoordinates);
    const expected = {
      left : { x: 0, y: 500 },
      right: { x: 3, y: 500 },
      up   : { x: 1, y: 498 },
      down : { x: 1, y: 501 }
    };

    expect(result).toEqual(expected);
  });
});
