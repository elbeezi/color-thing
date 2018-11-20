import React from 'react';
import mapColor from '../../utils/map-color/mapColor';

const Region = (props) => {
  const {
    x,
    y,
    color
  } = props;

  const regionProps = {
    x,
    y,
    color,
    fill: mapColor(color),
    width: 100,
    height: 100
  };

  return (
    <rect {...regionProps} />
  );
};

export default Region;
