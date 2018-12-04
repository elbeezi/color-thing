import {
  parseHexColor,
  hexifyRgbObject
} from '../hex-helpers/hexHelpers';

/*
  NOTE: `pickupColorValue` doesn't currently care if the source and/or target
    isn't between 0 and 255.
*/
export const pickUpColorValue = (source = 0, target = 0, step = 0) => {
  if (source < target) {
    return Math.min(source + step, target);
  } else if (source > target) {
    return Math.max(source - step, target);
  } else {
    return source;
  }
};

/**
  @function
  @param {string} sourceHex - The hex color to start from.
  @param {string} targetHex - The hex color to pick up.
  @param {number} stepAmount - The amount of the target color to pick up.
  @returns {string}
*/
const pickUpColor = (sourceHex = '', targetHex = '', stepAmount = 0) => {
  const {
    red: sourceRed,
    green: sourceGreen,
    blue: sourceBlue
  } = parseHexColor(sourceHex);

  const {
    red: targetRed,
    green: targetGreen,
    blue: targetBlue
  } = parseHexColor(targetHex);

  const outputRgbObject = {
    red: pickUpColorValue(sourceRed, targetRed, stepAmount),
    green: pickUpColorValue(sourceGreen, targetGreen, stepAmount),
    blue: pickUpColorValue(sourceBlue, targetBlue, stepAmount)
  };

  return hexifyRgbObject(outputRgbObject);
};

export default pickUpColor;
