import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';

const mapStateToProps = (state, ownProps) => ({
  levelIndex: parseInt(ownProps.match.params.level, 10) || 0,
  victory: state.victory
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onCompleteLevel: (currentLevel) => () => {
    const isFinalLevel = currentLevel === levelConfigs.length - 1;
    const incrementLevel = () => history.push(`/${parseInt(currentLevel, 10) + 1}`);
    isFinalLevel ? dispatch({ type: 'WIN_GAME' }) : incrementLevel();
  },
  restartGame() {
    dispatch({ type: 'START_GAME_OVER' });
    history.push('/');
  }
});

const StyledBigMessage = styled.h1`
  color: #ffffff;
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

const VictoryText = () => <BigMessage>You win the game!</BigMessage>;

const CheaterText = () => <BigMessage>Nice try, pal.</BigMessage>;

const GamePure = (props) => {
  const {
    levelIndex,
    onCompleteLevel,
    restartGame,
    victory
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
      <FlexWrapper>
        {
          victory
            ? <VictoryText/>
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
