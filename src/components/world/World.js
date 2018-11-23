import React from 'react';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';
import keyBindings from '../../utils/key-bindings/keyBindings';
import mapColor from '../../utils/map-color/mapColor';
import moveToColor from '../../utils/move-to-color/moveToColor';

let activeLevel = 0;

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

class World extends React.Component {
  constructor(props) {
    super(props);

    const level = levelConfigs[Object.keys(levelConfigs)[activeLevel]];
    activeLevel++;

    this.state = {
      character: {
        width: 1,
        height: 1,
        position: {
          x: level.characterStartingPosition.x,
          y: level.characterStartingPosition.y
        },
        velocity: {
          x: 1,
          y: 1
        },
        color: '#000000'
      },
      level
    };
  }

  levelUp() {
    const newLevel = levelConfigs[Object.keys(levelConfigs)[activeLevel]];
    activeLevel++;
    let nextLevelState = {
      character: {
        width: 1,
        height: 1,
        position: {
          x: newLevel.characterStartingPosition.x,
          y: newLevel.characterStartingPosition.y
        },
        velocity: {
          x: 1,
          y: 1
        },
        color: '#000000'
      },
      level: newLevel
    };
    this.setState(nextLevelState)
  }

  handleKeyDown({ keyCode }) {
    const { UP, DOWN, LEFT, RIGHT } = keyBindings;

    const {
      character,
      level
    } = this.state;

    const {
      gate
    } = level;

    const maxCoordinates = {
      x: level.width - character.width,
      y: level.height - character.height
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

    const isGate = isSamePosition(level.gate, newCharacterPosition);

    if (isGate) {
      if (gate.color === character.color) {
        // win the level, change the level
        console.log('hooray!');
        this.levelUp()
        return;
      } else {
        console.log('match the gate\'s color to pass.');
        // block movement
        return;
      }
    }

    const matchingRegion = level.regions.find((region) => {
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
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    const {
      character,
      level
    } = this.state;

    const levelProps = {
      ...level,
      character
    };

    const styleProps = {
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black'
    };

    return (
      <div className='World' style={styleProps}>
        <Level {...levelProps} />
      </div>
    );
  }
}

export default World;
