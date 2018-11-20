const incrementColorValue = (colorValue, changeAmount = 64) => {
  const COLOR_VALUE_MAX = 255;
  return Math.min(colorValue + changeAmount, COLOR_VALUE_MAX);
};

const decrementColorValue = (colorValue, changeAmount = 64) => {
  const COLOR_VALUE_MIN = 0;
  return Math.max(colorValue - changeAmount, COLOR_VALUE_MIN);
};

const moveToRed = colorObject => {
  return {
    ...colorObject,
    red  : incrementColorValue(colorObject.red),
    green: decrementColorValue(colorObject.green),
    blue : decrementColorValue(colorObject.blue)
  };
};

const moveToGreen = colorObject => {
  return {
    ...colorObject,
    red  : decrementColorValue(colorObject.red),
    green: incrementColorValue(colorObject.green),
    blue : decrementColorValue(colorObject.blue)
  };
};

const moveToBlue = colorObject => {
  return {
    ...colorObject,
    red  : decrementColorValue(colorObject.red),
    green: decrementColorValue(colorObject.green),
    blue : incrementColorValue(colorObject.blue)
  };
};

const moveToWhite = colorObject => {
  return {
    ...colorObject,
    red  : incrementColorValue(colorObject.red, 16),
    green: incrementColorValue(colorObject.green, 16),
    blue : incrementColorValue(colorObject.blue, 16)
  };
};

const moveToColor = (colorObject, targetColorString) => {
  switch (targetColorString) {
    case 'red':
      colorObject = moveToRed(colorObject);
      break;
    case 'green':
      colorObject = moveToGreen(colorObject);
      break;
    case 'blue':
      colorObject = moveToBlue(colorObject);
      break;
    case 'white':
      colorObject = moveToWhite(colorObject);
      break;
  }

  return colorObject;
};

export default moveToColor;
