import introMonochrome from './introMonochrome';
import fairlyStraightforward from './fairlyStraightforward';
import aLittlePickMeUp from './aLittlePickMeUp';
import intro from './01-Introduction';
import corners from './02-Corners';
import backForMore from './03-BackForMore';
import stayFocused from './04-StayFocused';
import rollTheDice from './05-RollTheDice';

export default [
  // fairlyStraightforward, // NOTE: not great, since one misstep and it's unsolvable
  intro,
  // aLittlePickMeUp, // NOTE: currently impossible
  corners,
  backForMore,
  introMonochrome,
  stayFocused,
  // rollTheDice // NOTE: currently nearly guaranteed to be impossible
];
