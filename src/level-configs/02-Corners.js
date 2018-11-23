const tileSize = 100;

const characterStartingPosition = {
  x: 1,
  y: 1
};

const levelConfig = {
  tileSize,

  width: 3,
  height: 3,

  characterStartingPosition,

  regions: [
    {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      color: 'blue'
    },
    {
      x: 0,
      y: 2,
      width: 1,
      height: 1,
      color: 'green'
    },
    {
      x: 2,
      y: 0,
      width: 1,
      height: 1,
      color: 'green'
    },
    {
      x: 2,
      y: 2,
      width: 1,
      height: 1,
      color: 'red'
    }
  ],

  gate: {
    x: 2,
    y: 1,
    color: '#400000'
  }
};

export default levelConfig;
