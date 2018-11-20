export const getRgbObj = colorString => {
  const colorsOnly = colorString.slice(4, colorString.length - 1);
  const colorsArr = colorsOnly.split(', ');

  return {
    red: parseInt(colorsArr[0], 10),
    green: parseInt(colorsArr[1], 10),
    blue: parseInt(colorsArr[2], 10)
  };
};

export const stringifyRgb = ({ red, green, blue }) => {
  return `rgb(${red}, ${green}, ${blue})`;
};
