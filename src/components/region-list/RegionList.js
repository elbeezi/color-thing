import React from 'react';
import Region from '../region/Region';

const RegionList = (props) => {
  const {
    regions,
    tileSize
  } = props;

  return regions.map((region, i) => {
    const regionProps = {
      ...region,
      tileSize
    };

    return <Region key={i} {...regionProps} />;
  });
};

export default RegionList;
