import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Character from '../character/Character';
import Gate from '../gate/Gate';
import RegionList from '../region-list/RegionList';
import pickUpColor from '../../utils/pick-up-color/pickUpColor';
import {
  characterPositionReducer,
  getCharacterColor,
  getCharacterPosition,
  getCharacterVelocity,
  getCharacterWidth,
  getCharacterHeight
} from '../../redux/character/characterReducer';
import {
  changeCharacterColor,
  setCharacterPosition,
} from '../../redux/character/characterActions';
import {
  loseGame
} from '../../redux/game-progress/gameProgressActions';
import {
  completeLevel
} from '../../redux/level-progress/levelProgressActions';
import {
  getActionTypeFromKeyboardInput
} from '../../utils/input-event-helpers/inputEventHelpers';

const isSamePosition = (a, b) => a.x === b.x && a.y === b.y;

const LevelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextBlock = styled.div`
  text-align: center;
  color: white;
`;

const StyledLevel = styled.div`
  position: relative;
  box-sizing: border-box;
  width     : ${props => props.tileSize * props.widthInTiles}px;
  height    : ${props => props.tileSize * props.heightInTiles}px;
  background: #000000;
`;

const enhance = connect(
  state => ({
    characterColor: getCharacterColor(state),
    characterPosition: getCharacterPosition(state),
    characterVelocity: getCharacterVelocity(state),
    characterWidth: getCharacterWidth(state),
    characterHeight: getCharacterHeight(state)
  }),
  {
    dispatchMoveCharacter: setCharacterPosition,
    dispatchChangeCharacterColor: changeCharacterColor,
    dispatchCompleteLevel: completeLevel,
    dispatchLoseGame: loseGame,
  }
);

// NOTE: This is a class because it needs lifecycle hooks and event listeners.
export class Level extends React.Component {

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
      characterColor,
      characterPosition,
      characterVelocity,
      characterWidth,
      characterHeight,
      dispatchChangeCharacterColor,
      dispatchCompleteLevel,
      dispatchLoseGame,
      dispatchMoveCharacter,
      endOnBleedout,
      width,
      height,
      gate,
      keepColor,
      regions,
    } = this.props;

    const action = {
      type: getActionTypeFromKeyboardInput(key),
      payload: {
        gatePosition: {
          x: gate.x,
          y: gate.y
        },
        velocity: characterVelocity,
        max: {
          x: width - characterWidth,
          y: height - characterHeight
        },
        min: {
          x: 0,
          y: 0
        }
      }
    };

    /*
      FIXME: We're misusing a reducer here.
        Problem is, in order to move the character properly,
        we need to know some information about the gate,
        as well as the level's max and min coordinates.
        A reducer to handle the complete character movement logic
        would need all that context.
    */
    const newCharacterPosition = characterPositionReducer(characterPosition, action);

    const hasNotMoved = isSamePosition(newCharacterPosition, characterPosition);

    if (hasNotMoved) {
      // We don't want to decay color if we haven't moved.
      return;
    }

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
    const {
      characterStartingColor,
      characterStartingPosition,
      dispatchChangeCharacterColor,
      dispatchMoveCharacter,
    } = this.props;

    dispatchMoveCharacter(characterStartingPosition);
    dispatchChangeCharacterColor(characterStartingColor);

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {
      width,
      height,
      gate,
      name,
      regions,
      tileSize
    } = this.props;

    const regionListProps = {
      regions,
      tileSize
    };

    const gateProps = {
      ...gate,
      tileSize
    };

    const styleProps = {
      widthInTiles: width,
      heightInTiles: height,
      tileSize
    };

    return (
      <LevelWrapper>
        <TextBlock>{name}</TextBlock>
        <StyledLevel className='Level' {...styleProps}>
          <RegionList {...regionListProps} />
          <Gate {...gateProps} />
          <Character tileSize={tileSize} />
        </StyledLevel>
        <TextBlock>{'Match the gate\'s color to pass.'}</TextBlock>
      </LevelWrapper>
    );
  }
}

const EnhancedLevel = enhance(Level);
export default EnhancedLevel;
