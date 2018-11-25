import React from 'react';
import { shallow } from 'enzyme';
import RegionList from './RegionList';

describe('RegionList', () => {
  it('renders', () => {
    const component = shallow(<RegionList regions={[]} />);
    expect(component.find('.RegionList')).toHaveLength(1);
  });
});
