import { mount } from 'enzyme';
import React from 'react';
describe('Jest Enzyme Environment test', () => {
  test('should have a div element has outermost node', () => {
    const wrapper = mount(<div className="some-class" />);
    expect(wrapper.find('.some-class').exists()).toEqual(true);
    expect(wrapper.find('.other-class').exists()).toEqual(false);
  })
});