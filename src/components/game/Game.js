import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';
import NextLevelModal from '../next-level/NextLevelModal';

const mapStateToProps = (state, ownProps) => ({
  levelIndex: parseInt(ownProps.match.params.level, 10) || 0,
  victory: state.victory,
  showModal: state.showModal
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onCompleteLevel: (currentLevel) => () => {
    const isFinalLevel = currentLevel === levelConfigs.length - 1;
    const incrementLevel = () => dispatch({ type: 'COMPLETE_LEVEL'});
    isFinalLevel ? dispatch({ type: 'WIN_GAME' }) : incrementLevel();
  },
  restartGame() {
    dispatch({ type: 'START_GAME_OVER' });
    history.push('/');
  },
  nextLevel: (currentLevel) => () => {
    const isFinalLevel = currentLevel === levelConfigs.length - 1;
    dispatch({ type: 'DURING_LEVEL'});
    history.push(`/${parseInt(currentLevel, 10) + 1}`);
  }
});

const StyledBigMessage = styled.h1`
  color: #ffffff;
`;

const StyledVictoryUI = styled.div`
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

const RestartGameButton = ({ restartGame, levelIndex }) => (
  <button onClick={restartGame} disabled={levelIndex === 0}>
    Restart Game
  </button>
);

const VictoryText = () => (
  <BigMessage>You win the game!</BigMessage>
);

const CheaterText = () => <BigMessage>Nice try, pal.</BigMessage>;

const GamePure = (props) => {
  const {
    levelIndex,
    onCompleteLevel,
    restartGame,
    victory,
    showModal,
    nextLevel,
  } = props;

  const isValidLevel = levelIndex >= 0 && levelIndex < levelConfigs.length;

  const activeLevelConfig = isValidLevel && levelConfigs[levelIndex];

  const ActiveLevel = () => (
    <Level {...activeLevelConfig} onCompleteLevel={onCompleteLevel(levelIndex)} />
  );

  const VictoryUI = () => (
    <StyledVictoryUI>
      <VictoryText/>
      <RestartGameButton restartGame={restartGame} levelIndex={levelIndex}/>
    </StyledVictoryUI>
  );

  return (
    <div>
      {showModal && <NextLevelModal show={showModal} nextLevel={nextLevel(levelIndex)}></NextLevelModal>}
      {!victory && <RestartGameButton restartGame={restartGame} levelIndex={levelIndex} />}
      <FlexWrapper>
        {
          victory
            ? <VictoryUI/>
            : isValidLevel ? <ActiveLevel/> : <CheaterText/>
        }
      </FlexWrapper>
    </div>
  );
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePure);

export default Game;
