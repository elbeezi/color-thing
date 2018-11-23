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

const criticalRegion = {
  x: 6,
  y: 5,
  width: 1,
  height: 1,
  color: 'green'
};

const protectedTile = {
  x: 5,
  y: 5
};

const gate = {
  x: 6,
  y: 6,
  color: '#00ff00'
};

const regionListGeneratorProps = {
  level: levelDimensions,
  tileSize,
  numRegions: 20,
  otherTiles: [
    characterStartingPosition,
    gate,
    criticalRegion,
    protectedTile
  ]
};

const levelConfig = {
  tileSize,

  width: levelDimensions.width,
  height: levelDimensions.height,

  characterStartingPosition,

  gate,

  regions: [
    criticalRegion,
    ...generateListOfRandomRegionConfigs(regionListGeneratorProps)
  ]
};

export default levelConfig;
