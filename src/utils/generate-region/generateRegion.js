import {
  getRandomColor,
  colorMap
} from '../color-mapper/colorMapper';

const generateRegion = (xValue, yValue, colorString) => {
  return {
    x     : xValue,
    y     : yValue,
    color : colorString,
    fill  : colorMap[colorString],
    width : 100,
    height: 100
  };
};

export const generateRegionWithRandomColor = (x, y) => {
  return generateRegion(x, y, getRandomColor());
};
