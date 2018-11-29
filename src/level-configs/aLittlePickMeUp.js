const tileSize = 100;

const levelConfig = {
  name: 'A Little Pick-Me-Up',

  tileSize,

  width: 7,
  height: 1,

  characterStartingPosition: {
    x: 0,
    y: 0
  },

  characterStartingColor: '#555555',

  regions: [
    {
      x: 4,
      y: 0,
      width: 1,
      height: 1,
      color: '#ffffff'
    }
  ],

  gate: {
    x: 6,
    y: 0,
    color: '#333333'
  },
};

export default levelConfig;

