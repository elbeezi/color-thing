import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';
import NextLevelModal from '../next-level-modal/NextLevelModal';
import {
  winGame,
  restartGame
} from '../../redux/game/gameActions';
import {
  showModal,
  hideModal
} from '../../redux/modal/modalActions';

const mapStateToProps = (state, ownProps) => ({
  levelIndex: parseInt(ownProps.match.params.level, 10) || 0,
  gameOverState: state.game.gameOverState,
  levelPassed: state.modal.levelPassed
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onCompleteLevel: (currentLevel) => () => {
    const isFinalLevel = currentLevel === levelConfigs.length - 1;
    const incrementLevel = () => dispatch(showModal(true));
    isFinalLevel ? dispatch(winGame()) : incrementLevel();
  },
  restartGame() {
    dispatch(restartGame());
    history.push('/');
  },
  nextLevel: (currentLevel) => () => {
    const isFinalLevel = currentLevel === levelConfigs.length - 1;
    dispatch(hideModal(false));
    history.push(`/${parseInt(currentLevel, 10) + 1}`);
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

export const GamePure = (props) => {
  const {
    gameOverState,
    levelIndex,
    levelPassed,
    onCompleteLevel,
    restartGame,
    nextLevel,
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
      <VictoryText />
      <RestartGameButton />
    </StyledVictoryUI>
  );

  const FailureUI = () => (
    <StyledFailureUI>
      <FailureText />
      <RestartGameButton />
    </StyledFailureUI>
  );

  const victory = gameOverState === 'victory';

  const isGameOver = !!gameOverState;

  const GameOverUI = () => (
    <FlexWrapper>
      {victory ? <VictoryUI /> : <FailureUI />}
    </FlexWrapper>
  );

  const LevelWrapper = () => (
    <div>
      <RestartGameButton />
      <FlexWrapper>
        {isValidLevel ? <ActiveLevel /> : <CheaterText />}
      </FlexWrapper>
    </div>
  );

  return (
    <div className='Game'>
      {
        levelPassed
          ? <NextLevelModal nextLevel={nextLevel(levelIndex)} />
          : isGameOver ? <GameOverUI /> : <LevelWrapper />
      }
    </div>
  );
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePure);

export default Game;
