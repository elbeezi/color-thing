const WORLD_HEIGHT = 300;
const WORLD_WIDTH  = 300;

const TILE_SIZE = 100;

const CHARACTER_HEIGHT = TILE_SIZE;
const CHARACTER_WIDTH  = TILE_SIZE;

const REGION_HEIGHT = TILE_SIZE;
const REGION_WIDTH  = TILE_SIZE;


const colorMap = {
  red  : 'rgb(255, 0, 0)',
  green: 'rgb(0, 255, 0)',
  blue : 'rgb(0, 0, 255)',
  white: 'rgb(255, 255, 255)'
};

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

export const regionsProps = [
  {
    /*
      x0: 0,
      x1: 199,
      y0: 0,
      y1: 199,
    */
    x     : 0,
    y     : 0,
    color : 'blue',
    fill  : colorMap.blue,
    id    : 'water',
    width : REGION_WIDTH,
    height: REGION_HEIGHT
  },
  {
    x     : 0,
    y     : 200,
    color : 'green',
    fill  : colorMap.green,
    id    : 'forest',
    width : REGION_WIDTH,
    height: REGION_HEIGHT
  },
  {
    x     : 200,
    y     : 0,
    color : 'green',
    fill  : colorMap.green,
    id    : 'grass',
    width : REGION_WIDTH,
    height: REGION_HEIGHT
  },
  {
    x     : 200,
    y     : 200,
    color : 'red',
    fill  : colorMap.red,
    id    : 'lava',
    width : REGION_WIDTH,
    height: REGION_HEIGHT
  }
];

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
