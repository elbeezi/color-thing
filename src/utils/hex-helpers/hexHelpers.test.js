import * as HexHelpers from './hexHelpers';

describe('parseHexColor', () => {

  it('returns an object with RGB values from the given hex string', () => {
    const output = HexHelpers.parseHexColor('#050407');
    const expected = { red: 5, green: 4, blue: 7 };

    expect(output).toEqual(expected);
  });
});

describe('hexifyRgbObject', () => {

  it('returns a hex color string from the given RGB values object', () => {
    const output = HexHelpers.hexifyRgbObject({ red: 5, green: 4, blue: 7});
    const expected = '#050407';

    expect(output).toEqual(expected);
  });
});
