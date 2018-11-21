import {
  generateListOfRandomRegionConfigs
} from '../utils/randomize-regions/randomizeRegions';

const tileSize = 100;

const levelDimensions = {
  width: 7,
  height: 7
};

const characterStartingPosition = {
  x: 0,
  y: 0
};

const regionListGeneratorProps = {
  level: levelDimensions,
  tileSize,
  numRegions: 20,
  otherTiles: [characterStartingPosition]
};

const levelConfig = {
  tileSize,

  width: levelDimensions.width,
  height: levelDimensions.height,

  characterStartingPosition,

  regions: generateListOfRandomRegionConfigs(regionListGeneratorProps)
};

export default levelConfig;
