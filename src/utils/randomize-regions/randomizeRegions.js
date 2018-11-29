import { randomNumberUpTo } from '../random-numbers/randomNumbers';
import { hexifyRgbObject } from '../hex-helpers/hexHelpers';

export const getRandomHexColor = () => {
  const rgbObject = {
    red  : randomNumberUpTo(256),
    green: randomNumberUpTo(256),
    blue : randomNumberUpTo(256)
  };

  return hexifyRgbObject(rgbObject);
};

export const generateRandomRegionConfig = (props) => {
  const { level } = props;

  return {
    x: randomNumberUpTo(level.width),
    y: randomNumberUpTo(level.height),
    width: 1,
    height: 1,
    color: getRandomHexColor()
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
