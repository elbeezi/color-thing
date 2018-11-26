const tileSize = 100;

const levelConfig = {
  tileSize,

  width: 7,
  height: 1,

  characterStartingPosition: {
    x: 0,
    y: 0
  },

  regions: [
    {
      x: 2,
      y: 0,
      width: 1,
      height: 1,
      color: '#0000ff'
    }
  ],

  gate: {
    x: 4,
    y: 0,
    color: '#000033'
  },
};

export default levelConfig;

