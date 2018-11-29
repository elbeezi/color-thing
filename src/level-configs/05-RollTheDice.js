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
    gate
  ]
};

const levelConfig = {
  name: 'Roll The Dice',

  tileSize,

  ...levelDimensions,

  characterStartingPosition,
  characterStartingColor: '#000000',

  gate,

  regions: generateListOfRandomRegionConfigs(regionListGeneratorProps)
};

export default levelConfig;
