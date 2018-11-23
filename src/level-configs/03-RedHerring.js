import { getRandomPrimaryColorString } from '../utils/map-color/mapColor';

const tileSize = 100;

const levelDimensions = {
  width: 4,
  height: 4
};

const characterStartingPosition = {
  x: 0,
  y: 0
};

// const regionGeneratorProps = {
//   level: levelDimensions,
//   tileSize
// };

// const randomRegion = generateRandomRegionConfig(regionGeneratorProps);

// const regionListGeneratorProps = {
//   ...regionGeneratorProps,
//   numRegions: 4,
//   existingTiles: [characterStartingPosition, randomRegion]
// };

// const randomRegionList = generateListOfRandomRegionConfigs(regionListGeneratorProps);

const levelConfig = {
  tileSize,
  /*
    Size (width/height) of the level in tiles.

    (Levels don't have (x, y) position, since they always draw from (0, 0).)
  */
  width             : levelDimensions.width,
  height            : levelDimensions.height,

  // (x, y) position where the character will start when the level loads.
  characterStartingPosition,

  /*
    List of config objects for colored regions to populate in the level.

    These can be set manually, or randomized to varying degrees:
      - A region's color can each be randomized
      - A region can be randomly generated
      - A list of regions can be randomly generated
  */
  regions           : [
    {
      x: 0,
      y: 3,
      width: 1,
      height: 1,
      color: 'red'
    },
    {
      x: 2,
      y: 1,
      width: 1,
      height: 1,
      color: getRandomPrimaryColorString()
    },
    // randomRegion,
    // ...randomRegionList
  ],

  /*
    Config object for the level's victory gate.
  */
  gate: {
    x: 3,
    y: 3,
    color: '#df0000'
  }
};

export default levelConfig;
