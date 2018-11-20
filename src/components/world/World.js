import React from 'react';
import Character from '../character/Character';
import Level from '../level/Level';
import levelOne from '../../levels/01-introduction';
import levelTwo from '../../levels/02-corners';
import keyBindings from '../../utils/key-bindings/keyBindings';
import mapColor from '../../utils/map-color/mapColor';
import moveToColor from '../../utils/move-to-color/moveToColor';
import {
  xVelocity,
  yVelocity,
  CHARACTER_HEIGHT,
  CHARACTER_WIDTH
} from '../../variables/commonVariables';
import {
  getRgbObj,
  stringifyRgb
} from '../../utils/rgb-converters/rgbConverters';

class World extends React.Component {
  constructor(props) {
    super(props);

    const level = levelTwo;

    this.state = {
      character: {
        x   : level.characterStartingX,
        y   : level.characterStartingY,
        fill: mapColor('white')
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

    const charXMax = level.width - CHARACTER_WIDTH;
    const charYMax = level.height - CHARACTER_HEIGHT;

    const characterX    = character.x;
    const characterY    = character.y;
    const characterFill = character.fill;

    const left  = characterX - xVelocity;
    const right = characterX + xVelocity;
    const up    = characterY - yVelocity;
    const down  = characterY + yVelocity;

    const characterPropsToSet = {
      x   : characterX,
      y   : characterY,
      fill: characterFill
    };

    switch (keyCode) {
      case LEFT:
        characterPropsToSet.x = Math.max(left, 0);
        break;

      case RIGHT:
        characterPropsToSet.x = Math.min(right, charXMax);
        break;

      case UP:
        characterPropsToSet.y = Math.max(up, 0);
        break;

      case DOWN:
        characterPropsToSet.y = Math.min(down, charYMax);
        break;

      default:
        // A non-movement key was pressed, so don't do anything.
        return;
    }

    if (characterX === characterPropsToSet.x && characterY === characterPropsToSet.y) {
      // Character didn't move, so don't do anything.
      return;
    }

    const matchingRegion = level.regions.find(region => {
      return region.x === characterPropsToSet.x && region.y === characterPropsToSet.y;
    });

    const colorToMoveTo = matchingRegion ? matchingRegion.color : 'white';

    const characterColorObj = getRgbObj(characterFill);
    const newColorObj = moveToColor(characterColorObj, colorToMoveTo);

    characterPropsToSet.fill = stringifyRgb(newColorObj);

    this.setState({
      character: {
        ...this.state.character,
        ...characterPropsToSet
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
