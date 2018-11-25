import React from 'react';
import { shallow } from 'enzyme';
import Gate from './Gate';

describe('Gate', () => {
  it('renders', () => {
    const component = shallow(<Gate/>);
    expect(component.find('.Gate')).toHaveLength(1);
  });
});
