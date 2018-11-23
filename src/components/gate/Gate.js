import React from 'react';

const Gate = (props) => {
  const {
    x,
    y,
    color,
    tileSize
  } = props;

  const styleProps = {
    boxSizing: 'border-box',
    position: 'absolute',
    left: tileSize * x,
    top: tileSize * y,
    width: tileSize,
    height: tileSize,
    border: `5px solid ${color}`
  };

  return (
    <div className='Gate' style={styleProps}/>
  );
};

export default Gate;
