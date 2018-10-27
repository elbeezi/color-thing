import * as Utils from './utils';

describe('`stringifyRGB`', () => {

  it('puts an object with RGB values into a CSS string', () => {
    const rgb = { red: 5, green: 4, blue: 7};

    const expected = 'rgb(5, 4, 7)';
    const result = Utils.stringifyRGB(rgb);

    expect(result).toEqual(expected);
  });
});
