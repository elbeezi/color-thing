import React from 'react';
import mapColor from '../../utils/map-color/mapColor';

/*
  A colored tile.
*/
const Region = (props) => {
  const {
    x,
    y,
    width,
    height,
    color,
    tileSize
  } = props;

  const styleProps = {
    position       : 'absolute',
    left           : tileSize * x,
    top            : tileSize * y,
    width          : tileSize * width,
    height         : tileSize * height,
    backgroundColor: mapColor(color)
  };

  return (
    <div className='Region' style={styleProps}/>
  );
};

export default Region;
