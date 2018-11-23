import React from 'react';
import styled from 'styled-components';
import Character from '../character/Character';
import Gate from '../gate/Gate';
import RegionList from '../region-list/RegionList';
import keyBindings from '../../utils/key-bindings/keyBindings';
import moveToColor from '../../utils/move-to-color/moveToColor';

const isSamePosition = (a, b) => a.x === b.x && a.y === b.y;

const getAdjacentCharacterPositions = (character, maxCoordinates) => {
  const {
    position,
    velocity
  } = character;

  return {
    left: {
      x: Math.max(position.x - velocity.x, 0),
      y: position.y
    },
    right: {
      x: Math.min(position.x + velocity.x, maxCoordinates.x),
      y: position.y
    },
    up: {
      x: position.x,
      y: Math.max(position.y - velocity.y, 0)
    },
    down: {
      x: position.x,
      y: Math.min(position.y + velocity.y, maxCoordinates.y)
    }
  };
};

const StyledLevel = styled.div`
  box-sizing: border-box;
  width     : ${props => props.tileSize * props.widthInTiles}px;
  height    : ${props => props.tileSize * props.heightInTiles}px;
  border    : 1px solid steelblue;
`;

class Level extends React.Component {
  constructor(props) {
    super(props);

    const {
      characterStartingPosition
    } = props;

    this.state = {
      character: {
        width: 1,
        height: 1,
        position: characterStartingPosition,
        velocity: {
          x: 1,
          y: 1
        },
        color: '#000000'
      },
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown({ keyCode }) {
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

    const targetColor = matchingRegion ? matchingRegion.color : 'black';

    const newColor = moveToColor(character.color, targetColor);

    this.setState({
      character: {
        ...character,
        position: newCharacterPosition,
        color: newColor
      }
    });
  }

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
      <StyledLevel {...styleProps}>
        <RegionList {...regionListProps} />
        <Gate {...gateProps} />
        <Character {...characterProps} />
      </StyledLevel>
    );
  }
}

export default Level;
