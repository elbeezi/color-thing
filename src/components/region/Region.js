import React from 'react';
import mapColor from '../../utils/map-color/mapColor';

const Region = (props) => {
  const {
    x: left,
    y: top,
    color
  } = props;

  const styleProps = {
    position: 'absolute',
    left,
    top,
    backgroundColor: mapColor(color),
    width: 100,
    height: 100
  };

  return (
    <div className='Region' style={styleProps}/>
  );
};

export default Region;
