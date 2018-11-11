export const getRGBObj = colorString => {
  const colorsOnly = colorString.slice(4, colorString.length - 1);
  const colorsArr = colorsOnly.split(', ');

  return {
    red: parseInt(colorsArr[0], 10),
    green: parseInt(colorsArr[1], 10),
    blue: parseInt(colorsArr[2], 10)
  };
};

export const stringifyRGB = ({ red, green, blue }) => {
  return `rgb(${red}, ${green}, ${blue})`;
};

const incrementColorValue = (colorValue, changeAmount = 64) => {
  const COLOR_VALUE_MAX = 255;
  return Math.min(colorValue + changeAmount, COLOR_VALUE_MAX);
};

const decrementColorValue = (colorValue, changeAmount = 64) => {
  const COLOR_VALUE_MIN = 0;
  return Math.max(colorValue - changeAmount, COLOR_VALUE_MIN);
};

const moveTowardsRed = colorObject => {
  return {
    ...colorObject,
    red  : incrementColorValue(colorObject.red),
    green: decrementColorValue(colorObject.green),
    blue : decrementColorValue(colorObject.blue)
  };
};

const moveTowardsGreen = colorObject => {
  return {
    ...colorObject,
    red  : decrementColorValue(colorObject.red),
    green: incrementColorValue(colorObject.green),
    blue : decrementColorValue(colorObject.blue)
  };
};

const moveTowardsBlue = colorObject => {
  return {
    ...colorObject,
    red  : decrementColorValue(colorObject.red),
    green: decrementColorValue(colorObject.green),
    blue : incrementColorValue(colorObject.blue)
  };
};

const moveTowardsWhite = colorObject => {
  return {
    ...colorObject,
    red  : incrementColorValue(colorObject.red, 16),
    green: incrementColorValue(colorObject.green, 16),
    blue : incrementColorValue(colorObject.blue, 16)
  };
};

export const moveTowardsColor = (colorObject, targetColorString) => {
  switch (targetColorString) {
    case 'red':
      colorObject = moveTowardsRed(colorObject);
      break;
    case 'green':
      colorObject = moveTowardsGreen(colorObject);
      break;
    case 'blue':
      colorObject = moveTowardsBlue(colorObject);
      break;
    case 'white':
      colorObject = moveTowardsWhite(colorObject);
      break;
  }

  return colorObject;
};
