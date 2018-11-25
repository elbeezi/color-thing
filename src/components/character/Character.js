import React from 'react';
import styled from 'styled-components';

const StyledCharacter = styled.div`
  position        : absolute;
  left            : ${props => props.tileSize * props.coordinates.x}px;
  top             : ${props => props.tileSize * props.coordinates.y}px;
  width           : ${props => props.tileSize * props.widthInTiles}px;
  height          : ${props => props.tileSize * props.heightInTiles}px;
  background-color: ${props => props.color};
  box-sizing      : border-box;
  border          : 2px solid purple;
`;

const Character = (props) => {
  const {
    color,
    position,
    width,
    height,
    tileSize
  } = props;

  // renaming some props to avoid collision with CSS properties or HTML attrs
  const styleProps = {
    color,
    coordinates  : position,
    widthInTiles : width,
    heightInTiles: height,
    tileSize
  };

  return (
    <StyledCharacter className='Character' {...styleProps} />
  );
};
export default Character;
