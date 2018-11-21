import React from 'react';

const Character = (props) => {
  const {
    position: coordinates, // renamed to avoid confusion with CSS property `position` (used below)
    color,

    width,
    height,
    tileSize
  } = props;

  const styleProps = {
    position       : 'absolute',
    left           : tileSize * coordinates.x,
    top            : tileSize * coordinates.y,
    width          : tileSize * width,
    height         : tileSize * height,
    backgroundColor: color,
    boxSizing      : 'border-box',
    border         : '2px solid purple'
  };

  return <div className='Character' style={styleProps}/>;
};

export default Character;
