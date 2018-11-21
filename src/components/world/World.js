import React from 'react';
import Level from '../level/Level';
import levelConfigs from '../../level-configs/levelConfigs';
import keyBindings from '../../utils/key-bindings/keyBindings';
import mapColor from '../../utils/map-color/mapColor';
import moveToColor from '../../utils/move-to-color/moveToColor';

const getAdjacentCharacterPositions = (character, maxCoordinates) => {
  const {
    position,
    velocity
  } = character;

  return {
    left: {
      x: Math.max((position.x - velocity.x), 0),
      y: position.y
    },
    right: {
      x: Math.min(position.x + velocity.x, maxCoordinates.x),
      y: position.y
    },
    up: {
      x: position.x,
      y: Math.max((position.y - velocity.y), 0)
    },
    down: {
      x: position.x,
      y: Math.min((position.y + velocity.y), maxCoordinates.y)
    }
  };
};

class World extends React.Component {
  constructor(props) {
    super(props);

    const level = levelConfigs.level3;

    this.state = {
      character: {
        width   : 100,
        height  : 100,
        position: {
          x: level.characterStartingX,
          y: level.characterStartingY
        },
        velocity: {
          x: 100,
          y: 100
        },
        color   : mapColor('white')
      },
      level
    };
  }

  handleKeyDown({ keyCode }) {
    const { UP, DOWN, LEFT, RIGHT } = keyBindings;

    const {
      character,
      level
    } = this.state;

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

    const isSameX = newCharacterPosition.x === character.position.x;
    const isSameY = newCharacterPosition.y === character.position.y;

    if (isSameX && isSameY) {
      // Character wouldn't move, so don't do anything.
      return;
    }
    const matchingRegion = level.regions.find(region => {
      return region.x === newCharacterPosition.x && region.y === newCharacterPosition.y;
    });

    const targetColor = matchingRegion ? matchingRegion.color : 'white';

    const newColor = moveToColor(character.color, targetColor);

    this.setState({
      character: {
        ...character,
        ...newCharacterPosition,
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

    return (
      <div className='World'>
        <Level {...levelProps}/>
      </div>
    );
  }
}

export default World;
