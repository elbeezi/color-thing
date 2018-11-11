import {
  colorMap
} from '../../variables';

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

export default generateRegion;