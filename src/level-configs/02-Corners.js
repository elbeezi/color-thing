const levelConfig = {
  name: 'Corners',

  tileSize: 100,

  width: 3,
  height: 3,

  characterStartingPosition: {
    x: 1,
    y: 1
  },

  characterStartingColor: '#000000',

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
