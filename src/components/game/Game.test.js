import React from 'react';
import { shallow } from 'enzyme';
import { GamePure } from './Game';

describe('GamePure', () => {
  it('renders', () => {
    const component = shallow(<GamePure />);
    expect(component.find('.Game')).toHaveLength(1);
  });
});
