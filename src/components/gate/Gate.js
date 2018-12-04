import React from 'react';
import styled from 'styled-components';
import ColorInfo from '../color-info/ColorInfo';

const StyledGate = styled.div`
  box-sizing: border-box;
  position  : absolute;
  left      : ${props => props.tileSize * props.coordinates.x}px;
  top       : ${props => props.tileSize * props.coordinates.y}px;
  width     : ${props => props.tileSize}px;
  height    : ${props => props.tileSize}px;
  border    : 15px solid ${props => props.gateColor};
  border-radius: 25px;
`;

const Gate = (props) => {
  const {
    x,
    y,
    color,
    tileSize
  } = props;

  const styleProps = {
    gateColor: color,
    coordinates: { x, y },
    tileSize
  };

  return (
    <StyledGate className='Gate' {...styleProps}>
      <ColorInfo color={color} />
    </StyledGate>
  );
};

export default Gate;
