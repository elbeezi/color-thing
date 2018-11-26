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
      color: '#0000ff'
    },
    {
      x: 0,
      y: 2,
      width: 1,
      height: 1,
      color: '#00ff00'
    },
    {
      x: 2,
      y: 0,
      width: 1,
      height: 1,
      color: '#00ff00'
    },
    {
      x: 2,
      y: 2,
      width: 1,
      height: 1,
      color: '#ff0000'
    }
  ],

  gate: {
    x: 2,
    y: 1,
    color: '#440000'
  }
};

export default levelConfig;
