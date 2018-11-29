export const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randomNumberUpTo = (max) => randomNumberBetween(0, max);
