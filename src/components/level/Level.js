import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Character from '../character/Character';
import Gate from '../gate/Gate';
import RegionList from '../region-list/RegionList';
import {
  getAdjacentCharacterPosition
} from '../../utils/get-adjacent-character-positions/getAdjacentCharacterPositions';
import pickUpColor from '../../utils/pick-up-color/pickUpColor';

const isSamePosition = (a, b) => a.x === b.x && a.y === b.y;

const StyledLevel = styled.div`
  position: relative;
  box-sizing: border-box;
  width     : ${props => props.tileSize * props.widthInTiles}px;
  height    : ${props => props.tileSize * props.heightInTiles}px;
  background: #000000;
`;

const mapStateToProps = (state) => ({
  character: state.character
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  moveCharacter(position) {
    dispatch({
      type: 'MOVE_CHARACTER',
      position
    });
  },
  changeCharacterColor(color) {
    dispatch({
      type: 'CHANGE_CHARACTER_COLOR',
      color
    });
  },
  setInitialCharacterPosition() {
    dispatch({
      type: 'MOVE_CHARACTER',
      position: ownProps.characterStartingPosition
    });
  },
  setInitialCharacterColor() {
    dispatch({
      type: 'CHANGE_CHARACTER_COLOR',
      color: ownProps.characterStartingColor
    });
  }
});

class Level extends React.Component {

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
  handleKeyDown = ({ keyCode }) => {
    const {
      changeCharacterColor,
      character,
      width,
      height,
      gate,
      keepColor,
      regions,
      moveCharacter,
      onCompleteLevel,
    } = this.props;

    const maxCoordinates = {
      x: width - character.width,
      y: height - character.height
    };

    const newCharacterPosition = getAdjacentCharacterPosition(character, maxCoordinates, keyCode);

    const hasNotMoved = isSamePosition(newCharacterPosition, character.position);

    if (hasNotMoved) {
      // We don't want to decay color if we haven't moved.
      return;
    }

    const isGate = isSamePosition(gate, newCharacterPosition);

    if (isGate) {
      if (gate.color === character.color) {
        // win the level, change the level
        onCompleteLevel();
        return;
      } else {
        console.log('Match the gate\'s color to pass.');
        // block movement
        return;
      }
    }

    moveCharacter(newCharacterPosition);

    const matchingRegion = regions.find((region) => {
      return isSamePosition(region, newCharacterPosition);
    });

    let newColor;

    // The magic numbers 17 and 68 make nice base-16 increments for hex colors.
    if (matchingRegion) {
      newColor = pickUpColor(character.color, matchingRegion.color, 68);
      changeCharacterColor(newColor);
    } else if (!keepColor) {
      newColor = pickUpColor(character.color, '#000000', 17);
      changeCharacterColor(newColor);
    }
  };

  componentDidMount() {
    const {
      name,
      setInitialCharacterColor,
      setInitialCharacterPosition
    } = this.props;

    console.log(name);

    setInitialCharacterPosition();
    setInitialCharacterColor();

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {
      character,
      width,
      height,
      gate,
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

    const characterProps = {
      ...character,
      tileSize
    };

    const styleProps = {
      widthInTiles : width,
      heightInTiles: height,
      tileSize
    };

    return (
      <StyledLevel className='Level' {...styleProps}>
        <RegionList {...regionListProps} />
        <Gate {...gateProps} />
        <Character {...characterProps} />
      </StyledLevel>
    );
  }
}

const EnhancedLevel = connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);

export default EnhancedLevel;
