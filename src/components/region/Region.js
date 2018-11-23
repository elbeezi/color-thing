import React from 'react';
import styled from 'styled-components';
import mapColor from '../../utils/map-color/mapColor';

const StyledRegion = styled.div`
  position: absolute;
  left: ${props => props.tileSize * props.coordinates.x}px;
  top: ${props => props.tileSize * props.coordinates.y}px;
  width: ${props => props.widthInTiles * props.tileSize}px;
  height: ${props => props.heightInTiles * props.tileSize}px;
  background-color: ${props => mapColor(props.color)};
`;

// A colored tile.
const Region = (props) => {
  const {
    x,
    y,
    width,
    height,
    color,
    tileSize
  } = props;

  const styleProps = {
    color,
    coordinates  : { x, y },
    widthInTiles : width,
    heightInTiles: height,
    tileSize
  };

  return (
    <StyledRegion {...styleProps} />
  );
};

export default Region;
