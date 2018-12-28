import React from 'react';
import { shallow } from 'enzyme';
import { Game } from './Game';

describe('Game', () => {
  it('renders', () => {
    const component = shallow(<Game />);
    expect(component.find('.Game')).toHaveLength(1);
  });
});
