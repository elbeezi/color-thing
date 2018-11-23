import {
  getRgbObjFromHex,
  hexifyRgbObj,
} from './mapColor';

describe('getRgbObjFromHex', () => {

  it('returns an object with RGB values from the given hex string', () => {
    const expected = { red: 5, green: 4, blue: 7 };
    const result = getRgbObjFromHex('#050407');

    expect(result).toEqual(expected);
  });
});

describe('hexifyRgbObj', () => {

  it('returns a hex color string from the given RGB values object', () => {
    const expected = '#050407';
    const result = hexifyRgbObj({ red: 5, green: 4, blue: 7});

    expect(result).toEqual(expected);
  });
});
