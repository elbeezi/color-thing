import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';

const mapStateToProps = (state, ownProps) => ({
  levelIndex: ownProps.match.params.level || state.activeLevelIndex || 0
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onCompleteLevel: (currentLevel) => () => {
    history.push(`/${parseInt(currentLevel, 10) + 1}`);
  },
  restartGame() {
    history.push('/');
  }
});

const StyledBigMessage = styled.h1`
  color: #ffffff;
`;

const LevelWrapper = styled.div`
  display        : flex;
  justify-content: center;
`;

const BigMessage = ({ children }) => (
  <StyledBigMessage>
    {children}
  </StyledBigMessage>
);

const VictoryText = () => <BigMessage>You win the game!</BigMessage>;

const GamePure = (props) => {
  const {
    levelIndex,
    onCompleteLevel,
    restartGame
  } = props;

  const isValidLevel = levelIndex >= 0 && levelIndex < levelConfigs.length;

  const activeLevelConfig = isValidLevel && levelConfigs[levelIndex];

  const ActiveLevel = () => {
    return (
      <Level {...activeLevelConfig} onCompleteLevel={onCompleteLevel(levelIndex)} />
    );
  };

  const RestartGameButton = () => (
    <button onClick={restartGame} disabled={levelIndex === 0}>
      Restart Game
    </button>
  );

  return (
    <div>
      <RestartGameButton/>
      <LevelWrapper>
        {
          activeLevelConfig ? <ActiveLevel/> : <VictoryText/>
        }
      </LevelWrapper>
    </div>
  );
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePure);

export default Game;
