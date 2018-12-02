import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';
import {
  winGame,
  restartGame
} from '../../redux/game/gameActions';

const mapStateToProps = (state, ownProps) => ({
  levelIndex: parseInt(ownProps.match.params.level, 10) || 0,
  gameOverState: state.game.gameOverState
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onCompleteLevel: (currentLevel) => () => {
    const isFinalLevel = currentLevel === levelConfigs.length - 1;
    const incrementLevel = () => history.push(`/${parseInt(currentLevel, 10) + 1}`);
    isFinalLevel ? dispatch(winGame()) : incrementLevel();
  },
  restartGame() {
    dispatch(restartGame());
    history.push('/');
  }
});

const StyledBigMessage = styled.h1`
  color: #ffffff;
`;

const StyledVictoryUI = styled.div`
  text-align: center;
`;

const StyledFailureUI = styled.div`
  text-align: center;
`;

const FlexWrapper = styled.div`
  display        : flex;
  justify-content: center;
`;

const BigMessage = ({ children }) => (
  <StyledBigMessage>
    {children}
  </StyledBigMessage>
);

const VictoryText = () => (
  <BigMessage>You win the game!</BigMessage>
);

const FailureText = () => (
  <BigMessage>You bled out.</BigMessage>
);

const CheaterText = () => (
  <BigMessage>Nice try, pal.</BigMessage>
);

const GamePure = (props) => {
  const {
    gameOverState,
    levelIndex,
    onCompleteLevel,
    restartGame
  } = props;

  const isValidLevel = levelIndex >= 0 && levelIndex < levelConfigs.length;

  const activeLevelConfig = isValidLevel && levelConfigs[levelIndex];

  const RestartGameButton = () => (
    <button onClick={restartGame}>Restart Game</button>
  );

  const ActiveLevel = () => (
    <Level {...activeLevelConfig} onCompleteLevel={onCompleteLevel(levelIndex)} />
  );

  const VictoryUI = () => (
    <StyledVictoryUI>
      <VictoryText/>
      <RestartGameButton/>
    </StyledVictoryUI>
  );

  const FailureUI = () => (
    <StyledFailureUI>
      <FailureText/>
      <RestartGameButton/>
    </StyledFailureUI>
  );

  const victory = gameOverState === 'victory';

  const isGameOver = !!gameOverState;

  const GameOverUI = () => (
    <FlexWrapper>
      {victory ? <VictoryUI/> : <FailureUI/>}
    </FlexWrapper>
  );

  const LevelWrapper = () => (
    <div>
      <RestartGameButton/>
      <FlexWrapper>
        {isValidLevel ? <ActiveLevel/> : <CheaterText/>}
      </FlexWrapper>
    </div>
  );

  return (
    isGameOver ? <GameOverUI/> : <LevelWrapper/>
  );
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePure);

export default Game;
