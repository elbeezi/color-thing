import getRandomInteger from '../get-random-integer/getRandomInteger';

const primaryColorMap = {
  red  : '#ff0000',
  green: '#00ff00',
  blue : '#0000ff'
};

const colorMap = {
  ...primaryColorMap,
  white: '#ffffff'
};

export const getRgbObjFromHex = (hexString) => {
  const redHex = hexString.slice(1, 3);
  const greenHex = hexString.slice(3, 5);
  const blueHex = hexString.slice(5, 7);

  return {
    red: parseInt(redHex, 16),
    green: parseInt(greenHex, 16),
    blue: parseInt(blueHex, 16)
  };
};

const hexifyRgbValue = (rgbValue) => {
  const hexString = rgbValue.toString(16);
  return hexString.length < 2 ? `0${hexString}` : hexString;
};

export const hexifyRgbObj = ({ red, green, blue }) => {
  const redHex = hexifyRgbValue(red);
  const greenHex = hexifyRgbValue(green);
  const blueHex = hexifyRgbValue(blue);
  return `#${redHex}${greenHex}${blueHex}`;
};

export const getRandomPrimaryColorString = () => {
  const primaryColorStringArray = Object.keys(primaryColorMap);

  const i = getRandomInteger(primaryColorStringArray.length);

  return primaryColorStringArray[i];
};

const mapColor = colorString => colorMap[colorString];
export default mapColor;

