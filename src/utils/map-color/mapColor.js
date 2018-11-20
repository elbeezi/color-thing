const colorMap = {
  red  : 'rgb(255, 0, 0)',
  green: 'rgb(0, 255, 0)',
  blue : 'rgb(0, 0, 255)',
  white: 'rgb(255, 255, 255)'
};


const getRandomNumberOutOfThree = () => (Math.floor(Math.random() * 10) % 3);

export const getRandomColor = () => {
  const randomNum = getRandomNumberOutOfThree();

  return Object.keys(colorMap)[randomNum];
};

const mapColor = colorString => colorMap[colorString];
export default mapColor;

