import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ColorInfo from '../color-info/ColorInfo';
import {
  getCharacterColor,
  getCharacterPosition,
  getCharacterWidth,
  getCharacterHeight
} from '../../redux/character/characterReducer';

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

const enhance = connect(
  (state) => ({
    characterColor: getCharacterColor(state),
    coordinates: getCharacterPosition(state),
    widthInTiles: getCharacterWidth(state),
    heightInTiles: getCharacterHeight(state)
  })
);

export const CharacterPure = (props) => {
  const {
    characterColor,
    coordinates,
    widthInTiles,
    heightInTiles,
    tileSize
  } = props;

  const styleProps = {
    characterColor,
    coordinates,
    widthInTiles,
    heightInTiles,
    tileSize
  };

  return (
    <StyledCharacter className='Character' {...styleProps}>
      <ColorInfo color={characterColor} />
    </StyledCharacter>
  );
};

const Character = enhance(CharacterPure);
export default Character;
