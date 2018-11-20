import React from 'react';

const Character = (props) => {
  const {
    position: coordinates, // renamed to avoid confusion with CSS property `position` (used below)
    width,
    height,
    color
  } = props;

  const { x, y } = coordinates;

  const styleProps = {
    position       : 'absolute',
    left           : x,
    top            : y,
    width,
    height,
    backgroundColor: color,
    boxSizing      : 'border-box',
    border         : '2px solid purple'
  };

  return <div className='Character' style={styleProps}/>;
};

export default Character;
