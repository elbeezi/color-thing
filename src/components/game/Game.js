import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';
import NextLevelModal from '../next-level-modal/NextLevelModal';
import {
  restartGame
} from '../../redux/game-progress/gameProgressActions';
import {
  getIsGameOver,
  getIsGameWon
} from '../../redux/game-progress/gameProgressReducer';
import {
  getIsLevelComplete
} from '../../redux/level-progress/levelProgressReducer';

const enhance = connect(
  (state, ownProps) => ({
    levelIndex: parseInt(ownProps.match.params.level, 10) || 0,
    isLevelComplete: getIsLevelComplete(state),
    isGameOver: getIsGameOver(state),
    isGameWon: getIsGameWon(state),
  }),
  (dispatch, { history }) => ({
    restartGame() {
      dispatch(restartGame());
      history.push('/');
    }
  })
);

const StyledBigMessage = styled.h1`
  color: #ffffff;
`;

const StyledGameOverUI = styled.div`
  text-align: center;
`;

const FlexWrapper = styled.div`
  display: flex;
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
    isGameOver,
    isGameWon,
    isLevelComplete,
    levelIndex,
    restartGame,
  } = props;

  const isValidLevel = levelIndex >= 0 && levelIndex < levelConfigs.length;

  const activeLevelConfig = isValidLevel && levelConfigs[levelIndex];

  const RestartGameButton = () => (
    <button onClick={restartGame}>Restart Game</button>
  );

  const GameOverUI = () => (
    <StyledGameOverUI>
      {isGameWon ? <VictoryText /> : <FailureText />}
      <RestartGameButton />
    </StyledGameOverUI>
  );

  const LevelWrapper = () => (
    <div>
      <RestartGameButton />
      <FlexWrapper>
        {isValidLevel ? <Level {...activeLevelConfig} /> : <CheaterText />}
      </FlexWrapper>
    </div>
  );

  const LevelOrModalWrapper = () => (
    isLevelComplete ? <NextLevelModal /> : <LevelWrapper />
  );

  return (
    <div className='Game'>
      {isGameOver ? <GameOverUI /> : <LevelOrModalWrapper />}
    </div>
  );
};

const Game = enhance(GamePure);

export default Game;
