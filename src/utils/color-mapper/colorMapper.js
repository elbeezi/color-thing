const getRandomNumberOutOfThree = () => (Math.floor(Math.random() * 10) % 3);

export const getRandomColor = () => {
  const randomNum = getRandomNumberOutOfThree();

  let color;

  if (randomNum === 0) {
    color = 'red';
  } else if (randomNum === 1) {
    color = 'green';
  } else {
    color = 'blue';
  }

  return color;
};

export const colorMap = {
  red  : 'rgb(255, 0, 0)',
  green: 'rgb(0, 255, 0)',
  blue : 'rgb(0, 0, 255)',
  white: 'rgb(255, 255, 255)'
};
