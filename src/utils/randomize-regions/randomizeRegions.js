import getRandomInteger from '../get-random-integer/getRandomInteger';
import { getRandomPrimaryColorString } from '../map-color/mapColor';

export const generateRandomRegionConfig = (props) => {
  const { level } = props;

  return {
    x: getRandomInteger(level.width),
    y: getRandomInteger(level.height),
    width: 1,
    height: 1,
    color: getRandomPrimaryColorString()
  };
};

export const generateListOfRandomRegionConfigs = (props) => {
  const {
    numRegions,
    level,
    otherTiles = []
  } = props;

  const maxTiles = level.width * level.height - otherTiles.length;

  if (numRegions > maxTiles) {
    throw new Error('Not enough available tiles');
  }

  const regionGeneratorProps = {
    level
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
