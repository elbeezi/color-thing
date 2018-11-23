import {
  getRgbObjFromHex,
  hexifyRgbObj
} from '../map-color/mapColor';

const incrementColorValue = (colorValue, changeAmount = 64) => {
  const COLOR_VALUE_MAX = 255;
  return Math.min(colorValue + changeAmount, COLOR_VALUE_MAX);
};

const decrementColorValue = (colorValue, changeAmount = 64) => {
  const COLOR_VALUE_MIN = 0;
  return Math.max(colorValue - changeAmount, COLOR_VALUE_MIN);
};

const moveToRed = (colorObject) => {
  return {
    ...colorObject,
    red  : incrementColorValue(colorObject.red),
    green: decrementColorValue(colorObject.green),
    blue : decrementColorValue(colorObject.blue)
  };
};

const moveToGreen = (colorObject) => {
  return {
    ...colorObject,
    red  : decrementColorValue(colorObject.red),
    green: incrementColorValue(colorObject.green),
    blue : decrementColorValue(colorObject.blue)
  };
};

const moveToBlue = (colorObject) => {
  return {
    ...colorObject,
    red  : decrementColorValue(colorObject.red),
    green: decrementColorValue(colorObject.green),
    blue : incrementColorValue(colorObject.blue)
  };
};

const moveToWhite = (colorObject) => {
  return {
    ...colorObject,
    red  : incrementColorValue(colorObject.red, 16),
    green: incrementColorValue(colorObject.green, 16),
    blue : incrementColorValue(colorObject.blue, 16)
  };
};

const moveToColorObject = (colorObject, targetColorString) => {
  let newColorObject;

  switch (targetColorString) {
    case 'red':
      newColorObject = moveToRed(colorObject);
      break;

    case 'green':
      newColorObject = moveToGreen(colorObject);
      break;

    case 'blue':
      newColorObject = moveToBlue(colorObject);
      break;

    case 'white':
      newColorObject = moveToWhite(colorObject);
      break;
  }

  return newColorObject;
};

const moveToColor = (hexString, targetColorString) => {
  const rgbObject = getRgbObjFromHex(hexString);
  const newRgbObject = moveToColorObject(rgbObject, targetColorString);

  return hexifyRgbObj(newRgbObject);
};

export default moveToColor;
