import React from 'react';
import { shallow } from 'enzyme';
import ColorInfo from './ColorInfo';

const defaultProps = {
  color: ''
};

describe('ColorInfo', () => {
  it('renders', () => {
    const component = shallow(<ColorInfo {...defaultProps} />);
    expect(component.find('.ColorInfo')).toHaveLength(1);
  });
});
