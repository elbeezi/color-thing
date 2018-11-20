import * as RgbConverters from './rgbConverters';

describe('`getRgbObj', () => {

  it('puts RGB values from a CSS string into an object', () => {
    const expected = { red: 5, green: 4, blue: 7 };
    const result = RgbConverters.getRGBObj('rgb(5, 4, 7)');

    expect(result).toEqual(expected);
  });
});

describe('`stringifyRGB`', () => {

  it('puts an object with RGB values into a CSS string', () => {
    const expected = 'rgb(5, 4, 7)';
    const result = RgbConverters.stringifyRGB({ red: 5, green: 4, blue: 7});

    expect(result).toEqual(expected);
  });
});
