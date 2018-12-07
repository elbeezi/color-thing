import { getRandomHexColor } from '../utils/randomize-regions/randomizeRegions';

const levelConfig = {
  name: 'Back For More',

  tileSize: 100,
  /*
    Size (width/height) of the level in tiles.

    Level configs don't include (x, y) position; levels always draw from (0, 0)
  */
  width: 3,
  height: 3,

  // (x, y) position where the character will start when the level loads.
  characterStartingPosition: {
    x: 0,
    y: 0
  },

  // Optional flag for preventing color decay. Defaults to false.
  // keepColor: false,

  characterStartingColor: '#000000',

  /*
    List of config objects for colored regions to populate in the level.

    These can be set manually, or randomized to varying degrees:
      - A region's color can each be randomized
      - A region can be randomly generated
      - A list of regions can be randomly generated
  */
  regions: [
    {
      x: 0,
      y: 2,
      width: 1,
      height: 1,
      color: '#ff0000'
    },
    {
      x: 1,
      y: 1,
      width: 1,
      height: 1,
      color: getRandomHexColor()
    },
  ],

  /*
    Config object for the level's victory gate.
  */
  gate: {
    x: 2,
    y: 2,
    color: '#660000'
  }
};

export default levelConfig;
