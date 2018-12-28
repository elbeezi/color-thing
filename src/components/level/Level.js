import React from 'react';
import styled from 'styled-components';
import Character from '../character/Character';
import Gate from '../gate/Gate';
import RegionList from '../region-list/RegionList';

const LevelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextBlock = styled.div`
  text-align: center;
  color: white;
`;

const StyledLevel = styled.div`
  position: relative;
  box-sizing: border-box;
  width     : ${props => props.tileSize * props.widthInTiles}px;
  height    : ${props => props.tileSize * props.heightInTiles}px;
  background: #000000;
`;

const LevelPure = (props) => {
  const {
    width,
    height,
    gate,
    name,
    regions,
    tileSize
  } = props;

  const regionListProps = {
    regions,
    tileSize
  };

  const gateProps = {
    ...gate,
    tileSize
  };

  const styleProps = {
    widthInTiles: width,
    heightInTiles: height,
    tileSize
  };

  return (
    <LevelWrapper>
      <TextBlock>{name}</TextBlock>
      <StyledLevel className='Level' {...styleProps}>
        <RegionList {...regionListProps} />
        <Gate {...gateProps} />
        <Character tileSize={tileSize} />
      </StyledLevel>
      <TextBlock>{'Match the gate\'s color to pass.'}</TextBlock>
    </LevelWrapper>
  );
};

const Level = LevelPure;
export default Level;
