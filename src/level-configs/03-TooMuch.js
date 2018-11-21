import {
  generateListOfRandomRegionConfigs
} from '../utils/randomize-regions/randomizeRegions';

const tileDimensions = {
  width: 100,
  height: 100
};

const levelDimensionsInTiles = {
  width: 7,
  height: 7
};

const characterStartingPosition = {
  x: 0,
  y: 0
};

const regionListGeneratorProps = {
  level: levelDimensionsInTiles,
  tile : tileDimensions,
  numRegions: 20,
  otherTiles: [characterStartingPosition]
};

const levelConfig = {
  width             : tileDimensions.width * levelDimensionsInTiles.width,
  height            : tileDimensions.height * levelDimensionsInTiles.height,

  characterStartingX: characterStartingPosition.x,
  characterStartingY: characterStartingPosition.y,

  regions           : generateListOfRandomRegionConfigs(regionListGeneratorProps)
};

export default levelConfig;
