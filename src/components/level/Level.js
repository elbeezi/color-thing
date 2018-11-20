import React from 'react';
import Character from '../character/Character';
import RegionList from '../region-list/RegionList';

const Level = (props) => {
  const {
    width,
    height,

    character,
    regions
  } = props;

  const styleProps = {
    width,
    height,
    boxSizing: 'border-box',
    border   : '1px solid steelblue'
  };

  return (
    <div style={styleProps}>
      <RegionList regions={regions}/>
      <Character {...character}/>
    </div>
  );
};

export default Level;
