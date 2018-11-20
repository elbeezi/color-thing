import React from 'react';
import Character from '../character/Character';
import RegionList from '../region-list/RegionList';

const Level = (props) => {
  const {
    width,
    height,

    character,
    regions
  } = props;

  return (
    <svg className='Level' x={0} y={0} width={width} height={height}>
      <RegionList regions={regions} />
      <Character {...character} />
    </svg>
  );
};

export default Level;
