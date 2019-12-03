import { mount } from 'enzyme';
import React from 'react';
import Calendar from '../client/calendar.jsx';
import moment from 'moment';

describe('<Calendar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calendar />);
  });
  test('should have a row of days depicting the day of the week', () => {
    expect(wrapper.text()).toContain('SuMoTuWeThFrSa');
  });
  test('should show current month and year by default', () => {
    expect(wrapper.text()).toContain(moment().format('MMMM YYYY'));
  });
  test('should show previous month and year by click on previous month arrow', () => {
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().subtract(1, 'M').format('MMMM YYYY'))
  });
  test('should show next month and year by click on next month arrow', () => {
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().add(1, 'M').format('MMMM YYYY'))
  });
  test('should have dates starting with 1 and ending on last day of the shown month', () => {
    expect(wrapper.text()).toContain(moment().endOf('M').format('DD'));
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.text().slice(-5)).toContain(moment().add(1, 'M').endOf('M').format('DD'));
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.text().slice(-5)).toContain(moment().add(2, 'M').endOf('M').format('DD'));
  });
  xtest('should have booked dates unavailable to select',() => {
    
  });
  xtest('should have availabe dates able to select', () => {

  });
});