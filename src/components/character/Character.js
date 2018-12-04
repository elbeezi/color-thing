import React from 'react';
import styled from 'styled-components';
import ColorInfo from '../color-info/ColorInfo';

const StyledCharacter = styled.div`
  position        : absolute;
  left            : ${props => props.tileSize * props.coordinates.x}px;
  top             : ${props => props.tileSize * props.coordinates.y}px;
  width           : ${props => props.tileSize * props.widthInTiles}px;
  height          : ${props => props.tileSize * props.heightInTiles}px;
  background-color: ${props => props.characterColor};
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

  const styleProps = {
    characterColor: color,
    coordinates  : position,
    widthInTiles : width,
    heightInTiles: height,
    tileSize
  };

  return (
    <StyledCharacter className='Character' {...styleProps}>
      <ColorInfo color={color} />
    </StyledCharacter>
  );
};

export default Character;
