import React from 'react';
import styled from 'styled-components';
import Character from '../character/Character';
import Gate from '../gate/Gate';
import RegionList from '../region-list/RegionList';
import getAdjacentCharacterPositions
  from '../../utils/get-adjacent-character-positions/getAdjacentCharacterPositions';
import keyBindings from '../../utils/key-bindings/keyBindings';
import pickUpColor from '../../utils/pick-up-color/pickUpColor';

const isSamePosition = (a, b) => a.x === b.x && a.y === b.y;

const StyledLevel = styled.div`
  box-sizing: border-box;
  width     : ${props => props.tileSize * props.widthInTiles}px;
  height    : ${props => props.tileSize * props.heightInTiles}px;
  border    : 1px solid steelblue;
`;

class Level extends React.Component {
  state = {
    character: {
      width: 1,
      height: 1,
      position: this.props.characterStartingPosition,
      velocity: {
        x: 1,
        y: 1
      },
      color: '#000000'
    },
  };

  handleKeyDown = ({ keyCode }) => {
    const {
      width,
      height,
      gate,
      regions,
      onLevelUp
    } = this.props;

    const {
      character
    } = this.state;

    const { UP, DOWN, LEFT, RIGHT } = keyBindings;

    const maxCoordinates = {
      x: width - character.width,
      y: height - character.height
    };

    const {
      left,
      right,
      up,
      down
    } = getAdjacentCharacterPositions(character, maxCoordinates);

    let newCharacterPosition;

    switch (keyCode) {
      case LEFT:
        newCharacterPosition = left;
        break;

      case RIGHT:
        newCharacterPosition = right;
        break;

      case UP:
        newCharacterPosition = up;
        break;

      case DOWN:
        newCharacterPosition = down;
        break;

      default:
        // A non-movement key was pressed, so don't do anything.
        return;
    }

    const hasNotMoved = isSamePosition(newCharacterPosition, character.position);

    if (hasNotMoved) {
      return;
    }

    const isGate = isSamePosition(gate, newCharacterPosition);

    if (isGate) {
      if (gate.color === character.color) {
        // win the level, change the level
        onLevelUp();
        return;
      } else {
        console.log('Match the gate\'s color to pass.');
        // block movement
        return;
      }
    }

    const matchingRegion = regions.find((region) => {
      return isSamePosition(region, newCharacterPosition);
    });

    const targetColor = matchingRegion ? matchingRegion.color : '#000000';

    const pickupAmount = targetColor === '#000000' ? 16 : 64;
    const newColor = pickUpColor(character.color, targetColor, pickupAmount);

    this.setState({
      character: {
        ...character,
        position: newCharacterPosition,
        color: newColor
      }
    });
  };

  componentDidMount() {
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
      regions,
      tileSize
    } = this.props;

    const {
      character
    } = this.state;

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

export default Level;
