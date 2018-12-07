import React from 'react';
import { shallow } from 'enzyme';
import { CharacterPure } from './Character';

describe('CharacterPure', () => {
  it('renders', () => {
    const component = shallow(<CharacterPure />);
    expect(component.find('.Character')).toHaveLength(1);
  });
});
