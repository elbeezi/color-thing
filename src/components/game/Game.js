import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Level from '../level/Level';
import {
  getCharacterColor,
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterWidth,
  getCharacterHeight,
  getCharacterAdjacencies
} from '../../redux/character/characterReducer';
import {
  changeCharacterColor,
  setCharacterPosition,
} from '../../redux/character/characterActions';
import {
  getCurrentLevelConfig,
  getCurrentLevelIndex,
  getIsGameOver,
  getIsGameWon,
  getIsLevelComplete,
} from '../../redux/game-progress/gameProgressReducer';
import {
  loseGame,
  completeLevel
} from '../../redux/game-progress/gameProgressActions';
import {
  startNextLevelAndUpdateCharacter,
  restartGameAndUpdateCharacter
} from '../../redux/game-progress/gameProgressThunkos';
import {
  mapInputToDirection
} from '../../utils/input-event-helpers/inputEventHelpers';
import pickUpColor from '../../utils/pick-up-color/pickUpColor';

const isSamePosition = (a, b) => a.x === b.x && a.y === b.y;

const enhance = connect(

  state => ({
    characterAdjacencies: getCharacterAdjacencies(state),
    characterColor: getCharacterColor(state),
    characterPosition: getCharacterPosition(state),
    characterVelocity: getCharacterVelocity(state),
    characterWidth: getCharacterWidth(state),
    characterHeight: getCharacterHeight(state),
    isLevelComplete: getIsLevelComplete(state),
    isGameOver: getIsGameOver(state),
    isGameWon: getIsGameWon(state),
    levelConfig: getCurrentLevelConfig(state),
    levelIndex: getCurrentLevelIndex(state),
  }),
  {
    dispatchMoveCharacter: setCharacterPosition,
    dispatchChangeCharacterColor: changeCharacterColor,
    dispatchCompleteLevel: completeLevel,
    dispatchLoseGame: loseGame,
    dispatchRestartGame: restartGameAndUpdateCharacter,
    dispatchStartNextLevel: startNextLevelAndUpdateCharacter,
  }
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


// NOTE: This is a class because it needs lifecycle hooks and event listeners.
export class Game extends React.Component {

  /*
    NOTE: Should definitely clean up this logic:

    -> Key is pressed
      a) Key is invalid
    END: nothing happens
      b) Key is movement key
    continue

    -> Character tries to move
      a) New character position is invalid
    END: nothing happens
      b) New character position is valid
    continue

    -> New character position is examined
      a) New character position is empty
    END: character moves & character color decays
      b) New character position has color
    END: character moves & character picks up color
      c) New character position is a gate
        1) Character matches gate color
    END: level complete
        2) Character doesn't match gate color
    END: nothing happens
  */
  // NOTE: explicit assignment syntax in order to preserve lexical scope
  handleKeyDown = ({ key }) => {
    const {
      characterAdjacencies,
      characterColor,
      characterPosition,
      dispatchChangeCharacterColor,
      dispatchCompleteLevel,
      dispatchLoseGame,
      dispatchMoveCharacter,
      isLevelComplete,
      levelConfig
    } = this.props;

    const {
      endOnBleedout,
      gate,
      keepColor,
      regions,
    } = levelConfig;

    // We don't want to do anything if the level is complete.
    if (isLevelComplete) return;

    const newCharacterPosition = characterAdjacencies[mapInputToDirection(key)] || characterPosition;

    const hasNotMoved = isSamePosition(newCharacterPosition, characterPosition);

    // We don't want to decay color if we haven't moved.
    if (hasNotMoved) return;

    const isGate = isSamePosition(gate, newCharacterPosition);

    if (isGate && gate.color === characterColor) {
      // win the level, change the level
      return dispatchCompleteLevel();
    } else if (isGate) {
      // block movement
      return alert('Match the gate\'s color to pass.');
    }

    dispatchMoveCharacter(newCharacterPosition);

    const matchingRegion = regions.find((region) => {
      return isSamePosition(region, newCharacterPosition);
    });

    let newColor;

    // The magic numbers 17 and 68 make nice base-16 increments for hex colors.
    if (matchingRegion) {
      newColor = pickUpColor(characterColor, matchingRegion.color, 68);
    } else if (!keepColor) {
      newColor = pickUpColor(characterColor, '#000000', 17);
    } else {
      newColor = characterColor;
    }

    dispatchChangeCharacterColor(newColor);

    if (newColor === '#000000' && endOnBleedout) {
      dispatchLoseGame();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {
      isGameOver,
      isGameWon,
      isLevelComplete,
      dispatchRestartGame,
      dispatchStartNextLevel,
      levelConfig
    } = this.props;

    const RestartGameButton = () => (
      <button onClick={dispatchRestartGame}>Restart Game</button>
    );

    const NextLevelButton = () => (
      <button onClick={dispatchStartNextLevel}>Next Level</button>
    );

    const NextLevelUI = () => (
      <StyledGameOverUI>
        <BigMessage>Level Complete!</BigMessage>
        <NextLevelButton />
      </StyledGameOverUI>
    );

    const GameOverUI = () => (
      <StyledGameOverUI>
        {isGameWon ? <VictoryText /> : <FailureText />}
        <RestartGameButton />
      </StyledGameOverUI>
    );

    const LevelWrapper = () => (
      <FlexWrapper>
        <Level {...levelConfig} />
      </FlexWrapper>
    );

    return (
      <div className='Game'>
        <RestartGameButton />
        {
          isGameOver
            ? <GameOverUI />
            : isLevelComplete ? <NextLevelUI /> : <LevelWrapper />
        }
      </div>
    );
  }
}

const EnhancedGame = enhance(Game);

export default EnhancedGame;
