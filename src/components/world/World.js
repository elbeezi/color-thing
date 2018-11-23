import React from 'react';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';

const StyledWorld = styled.div`
  width           : 100vw;
  height          : 100vh;
  background-color: #000000;
`;

class World extends React.Component {
  state = {
    activeLevelIndex: 0
  };

  render() {
    const { activeLevelIndex } = this.state;

    const activeLevelConfig = levelConfigs[activeLevelIndex];

    const onLevelUp = () => {
      this.setState((state) => ({
        activeLevelIndex: (state.activeLevelIndex + 1) % levelConfigs.length
      }));
    };

    const ActiveLevel = () => (
      <Level {...activeLevelConfig} onLevelUp={onLevelUp} />
    );

    return (
      <StyledWorld>
        <ActiveLevel/>
      </StyledWorld>
    );
  }
}

export default World;
