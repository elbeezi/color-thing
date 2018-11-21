import getRandomNumberBetweenZeroAndX from '../get-random-number/getRandomNumber';
import { getRandomPrimaryColorString } from '../map-color/mapColor';

export const generateRandomRegionConfig = (props) => {
  const {
    level,
    tile
  } = props;

  return {
    x    : getRandomNumberBetweenZeroAndX(level.width) * tile.width,
    y    : getRandomNumberBetweenZeroAndX(level.height) * tile.height,
    color: getRandomPrimaryColorString()
  };
};

export const generateListOfRandomRegionConfigs = (props) => {
  const {
    numRegions,
    level,
    tile,
    otherTiles = []
  } = props;

  const maxTiles = level.width * level.height - otherTiles.length;

  if (numRegions > maxTiles) {
    throw new Error('Not enough available tiles');
  }

  const regionGeneratorProps = {
    level,
    tile
  };

  const regionConfigList = [];

  while (regionConfigList.length < numRegions) {
    const newRegionConfig = generateRandomRegionConfig(regionGeneratorProps);

    const existingTiles = [...regionConfigList, ...otherTiles];

    const overlapsExistingTile = existingTiles.some((regionConfig) => {
      const isSameX = regionConfig.x === newRegionConfig.x;
      const isSameY = regionConfig.y === newRegionConfig.y;
      return isSameX && isSameY;
    });

    if (!overlapsExistingTile) {
      regionConfigList.push(newRegionConfig);
    }
  }

  return regionConfigList;
};
