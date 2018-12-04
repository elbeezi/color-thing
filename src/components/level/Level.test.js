import React from 'react';
import { shallow } from 'enzyme';
import { Level } from './Level';

const defaultProps = {
  dispatchChangeCharacterColor: jest.fn(),
  dispatchMoveCharacter: jest.fn()
};

describe('Level', () => {
  it('renders', () => {
    const component = shallow(<Level {...defaultProps} />);
    expect(component.find('.Level')).toHaveLength(1);
  });
});
