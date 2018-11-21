import getRandomNumberBetweenZeroAndX from '../get-random-number/getRandomNumber';

const primaryColorMap = {
  red  : 'rgb(255, 0, 0)',
  green: 'rgb(0, 255, 0)',
  blue : 'rgb(0, 0, 255)'
};

const colorMap = {
  ...primaryColorMap,
  white: 'rgb(255, 255, 255)'
};


export const getRandomPrimaryColorString = () => {
  const primaryColorStringArray = Object.keys(primaryColorMap);

  const i = getRandomNumberBetweenZeroAndX(primaryColorStringArray.length);

  return primaryColorStringArray[i];
};

const mapColor = colorString => colorMap[colorString];
export default mapColor;

