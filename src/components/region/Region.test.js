import React from 'react';
import { shallow } from 'enzyme';
import Region from './Region';

describe('Region', () => {
  it('renders', () => {
    const component = shallow(<Region/>);
    expect(component.find('.Region')).toHaveLength(1);
  });
});
