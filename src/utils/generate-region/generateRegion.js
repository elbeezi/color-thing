import {
  getRandomColor,
  mapColor
} from '../color-mapper/colorMapper';

const REGION_HEIGHT = 100;
const REGION_WIDTH = 100;

export const generateRegion = (x, y, colorString) => {
  return {
    x,
    y,
    color: colorString,
    fill  : mapColor(colorString),
    height: REGION_HEIGHT,
    width : REGION_WIDTH
  };
};

export const generateRegionWithRandomColor = (x, y) => {
  return generateRegion(x, y, getRandomColor());
};
