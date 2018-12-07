import { characterPositionReducer } from './characterReducer';

describe('characterPositionReducer', () => {
  const startingPosition = { x: 1, y: 500 };

  const max = { x: 50, y: 501 };
  const min = { x: 0, y: 0 };
  const velocity = { x: 2, y: 2 };

  const payload = {
    max,
    min,
    velocity,
  };

  describe('when given the action \'MOVE_CHARACTER_LEFT\'', () => {
    const action = {
      type: 'MOVE_CHARACTER_LEFT',
      payload
    };

    it('returns the correct coordinates', () => {
      const output = characterPositionReducer(startingPosition, action);
      const expected = { x: 0, y: 500 };

      expect(output).toEqual(expected);
    });
  });

  describe('when given the action \'MOVE_CHARACTER_RIGHT\'', () => {
    const action = {
      type: 'MOVE_CHARACTER_RIGHT',
      payload
    };

    it('returns the correct coordinates', () => {
      const output = characterPositionReducer(startingPosition, action);
      const expected = { x: 3, y: 500 };

      expect(output).toEqual(expected);
    });
  });

  describe('when given the action \'MOVE_CHARACTER_UP\'', () => {
    const action = {
      type: 'MOVE_CHARACTER_UP',
      payload
    };

    it('returns the correct coordinates', () => {
      const output = characterPositionReducer(startingPosition, action);
      const expected = { x: 1, y: 498 };

      expect(output).toEqual(expected);
    });
  });

  describe('when given the action \'MOVE_CHARACTER_DOWN\'', () => {
    const action = {
      type: 'MOVE_CHARACTER_DOWN',
      payload
    };

    it('returns the correct coordinates', () => {
      const output = characterPositionReducer(startingPosition, action);
      const expected = { x: 1, y: 501 };

      expect(output).toEqual(expected);
    });
  });
});
