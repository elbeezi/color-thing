import React from 'react';
import styled from 'styled-components';
import { parseHexColor } from '../../utils/hex-helpers/hexHelpers';

const ColorText = styled.div`
  color: white;
  font-size: 12px;
`;

const ColorInfo = ({ color }) => {
  const rgbValues = parseHexColor(color);

  return (
    <div>
      <ColorText>Red: {rgbValues.red}</ColorText>
      <ColorText>Green: {rgbValues.green}</ColorText>
      <ColorText>Blue: {rgbValues.blue}</ColorText>
    </div>
  );
};

export default ColorInfo;
