import {
  CHARACTER_HEIGHT,
  CHARACTER_WIDTH
} from '../../variables/commonVariables';

import React from 'react';

const Character = (props) => {
  const initialCharacterProps = {
    height     : CHARACTER_HEIGHT,
    width      : CHARACTER_WIDTH,
    stroke     : 'purple',
    strokeWidth: '2px'
  };

  const characterProps = {
    ...props,
    ...initialCharacterProps
  };

  return <rect {...characterProps} />;
};

export default Character;
