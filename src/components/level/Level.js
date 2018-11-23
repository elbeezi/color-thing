import React from 'react';
import Character from '../character/Character';
import Gate from '../gate/Gate';
import RegionList from '../region-list/RegionList';

const Level = (props) => {
  const {
    width,
    height,

    character,
    gate,
    regions,
    tileSize
  } = props;

  const styleProps = {
    width: tileSize * width,
    height: tileSize * height,
    boxSizing: 'border-box',
    border: '1px solid steelblue'
  };

  const regionListProps = {
    regions,
    tileSize
  };

  const gateProps = {
    ...gate,
    tileSize
  };

  const characterProps = {
    ...character,
    tileSize
  };

  return (
    <div style={styleProps}>
      <RegionList {...regionListProps} />
      <Character {...characterProps} />
      <Gate {...gateProps} />
    </div>
  );
};

export default Level;
