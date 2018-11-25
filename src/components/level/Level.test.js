import React from 'react';
import { shallow } from 'enzyme';
import Level from './Level';

describe('Level', () => {
  it('renders', () => {
    const component = shallow(<Level/>);
    expect(component.find('.Level')).toHaveLength(1);
  });
});
