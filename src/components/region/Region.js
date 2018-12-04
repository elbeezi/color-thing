import React from 'react';
import styled from 'styled-components';

const StyledRegion = styled.div`
  position: absolute;
  left: ${props => props.tileSize * props.coordinates.x}px;
  top: ${props => props.tileSize * props.coordinates.y}px;
  width: ${props => props.widthInTiles * props.tileSize}px;
  height: ${props => props.heightInTiles * props.tileSize}px;
  background-color: ${props => props.regionColor};
`;

// A colored tile.
const Region = (props) => {
  const {
    x,
    y,
    width = 1,
    height = 1,
    color,
    tileSize
  } = props;

  const styleProps = {
    regionColor: color,
    coordinates  : { x, y },
    widthInTiles : width,
    heightInTiles: height,
    tileSize
  };

  return (
    <StyledRegion className='Region' {...styleProps} />
  );
};

export default Region;
