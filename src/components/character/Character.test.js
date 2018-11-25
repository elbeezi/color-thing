import React from 'react';
import { shallow } from 'enzyme';
import Character from './Character';

describe('Character', () => {
  it('renders', () => {
    const component = shallow(<Character/>);
    expect(component.find('.Character')).toHaveLength(1);
  });
});
