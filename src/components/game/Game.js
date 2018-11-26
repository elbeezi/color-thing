import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';

const mapStateToProps = (state) => ({
  activeLevelConfig: levelConfigs[state.activeLevelIndex]
});

const mapDispatchToProps = (dispatch) => ({
  onCompleteLevel: () => dispatch({ type: 'INCREMENT_LEVEL_INDEX' })
});

const VictoryText = styled.h1`
  color: #ffffff;
`;

const StyledGame = styled.div`
  display        : flex;
  justify-content: center;
`;

const GamePure = (props) => {
  const {
    activeLevelConfig,
    onCompleteLevel
  } = props;

  const ActiveLevel = () => (
    activeLevelConfig
      ? <Level {...activeLevelConfig} onCompleteLevel={onCompleteLevel} />
      : <VictoryText>You win the game!</VictoryText>
  );

  return (
    <StyledGame>
      <ActiveLevel/>
    </StyledGame>
  );
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePure);

export default Game;
