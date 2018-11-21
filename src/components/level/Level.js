import React from 'react';
import Character from '../character/Character';
import RegionList from '../region-list/RegionList';

const Level = (props) => {
  const {
    width,
    height,

    character,
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

  const characterProps = {
    ...character,
    tileSize
  };

  return (
    <div style={styleProps}>
      <RegionList {...regionListProps} />
      <Character {...characterProps} />
    </div>
  );
};

export default Level;
