import generateRegion from './generateRegion';

describe('`generateRegion', () => {
  it('gives you back a 100x100 object with an x, y, and color', () => {
    const expected = {x: 0, y: 0, color: 'blue', fill: 'rgb(0, 0, 255)', width : 100, height: 100};
    const result = generateRegion(0, 0, 'blue');
    expect(result).toEqual(expected);
  });
});
