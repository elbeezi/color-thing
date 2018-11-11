import { colorMap } from './utils/color-mapper/colorMapper';

const WORLD_HEIGHT = 300;
const WORLD_WIDTH  = 300;

const TILE_SIZE = 100;

const CHARACTER_HEIGHT = TILE_SIZE;
const CHARACTER_WIDTH  = TILE_SIZE;


export const worldProps = {
  id    : 'world',
  class : 'world',
  height: WORLD_HEIGHT,
  width : WORLD_WIDTH,
  x     : 0,
  y     : 0
};

export const characterProps = {
  id            : 'character',
  height        : CHARACTER_HEIGHT,
  width         : CHARACTER_WIDTH,
  x             : TILE_SIZE,
  y             : TILE_SIZE,
  stroke        : 'purple',
  'stroke-width': '2px',
  fill          : colorMap.white
};

// NOTE: these are all `keydown` codes
export const keyBindings = {
  UP   : 87, // w
  LEFT : 65, // a
  DOWN : 83, // s
  RIGHT: 68  // d
};

export const xVelocity = CHARACTER_WIDTH;
export const yVelocity = CHARACTER_HEIGHT;

export const charXMax = WORLD_WIDTH - CHARACTER_WIDTH;
export const charYMax = WORLD_HEIGHT - CHARACTER_HEIGHT;
