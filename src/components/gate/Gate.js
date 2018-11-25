import React from 'react';
import styled from 'styled-components';

const StyledGate = styled.div`
  box-sizing: border-box;
  position  : absolute;
  left      : ${props => props.tileSize * props.coordinates.x}px;
  top       : ${props => props.tileSize * props.coordinates.y}px;
  width     : ${props => props.tileSize}px;
  height    : ${props => props.tileSize}px;
  border    : 5px solid ${props => props.color};
`;

const Gate = (props) => {
  const {
    x,
    y,
    color,
    tileSize
  } = props;

  const styleProps = {
    color,
    coordinates: { x, y },
    tileSize
  };

  return (
    <StyledGate className='Gate' {...styleProps} />
  );
};

export default Gate;
