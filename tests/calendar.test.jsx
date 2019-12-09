import { mount } from 'enzyme';
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import Calendar from '../client/calendar.jsx';
import 'jest-styled-components';

describe('<Calendar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calendar reservations={[]} view="" datePicker={() => {}} checkInDate="" checkOutDate="" />);
  });
  test('should have a div element with a table element with thead and tbody elements', () => {
    expect(wrapper.find('table').parent().is('StyledComponent')).toBe(true);
    expect(wrapper.find('thead').parent().is('table')).toBe(true);
    expect(wrapper.find('tbody').parent().is('table')).toBe(true);
  });
  test('should have a row of days depicting the day of the week', () => {
    expect(wrapper.text()).toContain('SuMoTuWeThFrSa');
  });
  test('should show current month and year by default, stored in state', () => {
    expect(wrapper.text()).toContain(moment().format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month', 'hoverDate']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().format('YYYY-MM'));
    expect(wrapper.exists('.week6')).toBe(false);
  });
  test('should show correct calendar after clicking previous month arrow, modifying state.month', () => {
    wrapper = mount(<Calendar reservations={[]} view="checkIn" datePicker={() => {}} checkInDate="" checkOutDate="" />);
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().subtract(1, 'M').format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month', 'hoverDate']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().subtract(1, 'M').format('YYYY-MM'));
    while (wrapper.find('th#calendar-month-description').text() !== 'June 2019') {
      wrapper.find('button#previousMonth').simulate('click');
    }
    expect(wrapper.exists('.week6')).toBe(true);
    while (wrapper.find('th#calendar-month-description').text() !== 'February 2015') {
      wrapper.find('button#previousMonth').simulate('click');
    }
    expect(wrapper.exists('.week5')).toBe(false);
    wrapper = mount(<Calendar reservations={[]} view="checkOut" datePicker={() => {}} checkInDate="" checkOutDate="" />);
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().subtract(1, 'M').format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month', 'hoverDate']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().subtract(1, 'M').format('YYYY-MM'));
    expect(wrapper.exists('.week6')).toBe(false);
    while (wrapper.find('th#calendar-month-description').text() !== 'February 2015') {
      wrapper.find('button#previousMonth').simulate('click');
    }
    expect(wrapper.exists('.week5')).toBe(false);
  });
  test('should show correct monthy after clicking next month arrow, modifying state.month', () => {
    wrapper.find('button#nextMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().add(1, 'M').format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month', 'hoverDate']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().add(1, 'M').format('YYYY-MM'));
  });
  xtest('should have dates starting with 1 and ending on last day of the shown month', () => {
    expect(wrapper.text()).toContain(moment().endOf('M').format('DD'));
    wrapper.find('button#nextMonth').simulate('click');
    expect(wrapper.text().slice(-5)).toContain(moment().add(1, 'M').endOf('M').format('DD'));
    wrapper.find('button#nextMonth').simulate('click');
    expect(wrapper.text().slice(-5)).toContain(moment().add(2, 'M').endOf('M').format('DD'));
  });
  test('should have booked dates unavailable to select', () => {
    const spy = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkIn" datePicker={spy} checkInDate="" checkOutDate="" />);
    wrapper.find('button#nextMonth').simulate('click');
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkOut" datePicker={spy} checkInDate="" checkOutDate="" />);
    wrapper.find('button#nextMonth').simulate('click');
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkIn" datePicker={spy} checkInDate="2019-12-7" checkOutDate="" />);
    wrapper.find('button#nextMonth').simulate('click');
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkOut" datePicker={spy} checkInDate="" checkOutDate="2019-12-8" />);
    wrapper.find('button#nextMonth').simulate('click');
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
  });
  test('should have available dates able to select', () => {
    const spy = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkIn" datePicker={spy} checkInDate="" checkOutDate="" />);
    wrapper.find('button#nextMonth').simulate('click');
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(0).simulate('click');
    expect(spy.calledOnce).toBe(true);
    const spy2 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkOut" datePicker={spy2} checkInDate="" checkOutDate="" />);
    wrapper.find('button#nextMonth').simulate('click');
    wrapper.find('button#previousMonth').simulate('click');
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(0).simulate('click');
    expect(spy2.calledOnce).toBe(true);
    const spy3 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkOut" datePicker={spy3} checkInDate="2020-04-15" checkOutDate="" />);
    while (wrapper.find('th#calendar-month-description').text() !== 'April 2020') {
      wrapper.find('button#nextMonth').simulate('click');
    }
    wrapper.find('.available').at(0).simulate('click');
    expect(spy3.calledOnce).toBe(true);
    const spy4 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkOut" datePicker={spy4} checkInDate="2019-12-17" checkOutDate="" />);
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(0).simulate('click');
    expect(spy4.calledOnce).toBe(true);
    const spy5 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-11', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkOut" datePicker={spy5} checkInDate="2019-12-18" checkOutDate="" />);
    expect(wrapper.find('th#calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(1).simulate('click');
    expect(spy5.calledOnce).toBe(true);
  });
  test('should have functional clear date if a check-in or check-out date is selected', () => {
    const spy = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkIn" datePicker={() => {}} checkInDate="" checkOutDate="" />);
    expect(wrapper.exists('#clearDates')).toBe(false);
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkIn" datePicker={spy} checkInDate="2019-12-17" checkOutDate="" />);
    expect(wrapper.exists('#clearDates')).toBe(true);
    wrapper.find('div#clearDates').simulate('click');
    expect(spy.calledWith({})).toBe(true);
    wrapper = mount(<Calendar reservations={[{ startDate: '2019-12-10', endDate: '2019-12-16' }, { startDate: '2019-12-22', endDate: '2020-01-08' }]} view="checkIn" datePicker={spy} checkInDate="" checkOutDate="2019-12-19" />);
    expect(wrapper.exists('#clearDates')).toBe(true);
    wrapper.find('div#clearDates').simulate('click');
    expect(spy.calledWith({})).toBe(true);
  });
});
