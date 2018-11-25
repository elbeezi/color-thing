import React from 'react';
import { shallow } from 'enzyme';
import World from './World';

describe('World', () => {
  it('renders', () => {
    const component = shallow(<World/>);
    expect(component.find('.World')).toHaveLength(1);
  });
});
