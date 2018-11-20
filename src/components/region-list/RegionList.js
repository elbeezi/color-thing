import React from 'react';
import Region from '../region/Region';

const RegionList = (props) => {
  const { regions } = props;

  return (
    regions.map((regionProps, i) => <Region key={i} {...regionProps}/>)
  );
};

export default RegionList;
