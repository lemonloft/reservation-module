import { mount } from 'enzyme';
import React from 'react';
import Calendar from '../client/calendar.jsx';
import moment from 'moment';
import sinon from 'sinon';

describe('<Calendar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calendar reservations={[]} view={''} datePicker={()=>{}} checkInDate={''} checkOutDate={''} />);
  });
  test('should have a div element with a table element with thead and tbody elements', () =>{
    expect(wrapper.find('table').parent().is('div')).toBe(true);
    expect(wrapper.find('thead').parent().is('table')).toBe(true);
    expect(wrapper.find('tbody').parent().is('table')).toBe(true);
  })
  test('should have a row of days depicting the day of the week', () => {
    expect(wrapper.text()).toContain('SuMoTuWeThFrSa');
  });
  test('should show current month and year by default, stored in state', () => {
    expect(wrapper.text()).toContain(moment().format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().format('YYYY-MM'));
    expect(wrapper.exists('.week6')).toBe(false);
  });
  test('should show correct calendar after clicking previous month arrow, modifying state.month', () => {
    wrapper = mount(<Calendar reservations={[]} view={'checkIn'} datePicker={()=>{}} checkInDate={''} checkOutDate={''} />);
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().subtract(1, 'M').format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().subtract(1, 'M').format('YYYY-MM'));
    expect(wrapper.exists('.week6')).toBe(false);
    for(let i = 0; i < 5; i++) {
      wrapper.find('.previousMonth').simulate('click');
    }
    expect(wrapper.exists('.week6')).toBe(true);
    while(wrapper.find('.calendar-month-description').text() !== "February 2015"){
      wrapper.find('.previousMonth').simulate('click');
    }
    expect(wrapper.exists('.week5')).toBe(false);
    wrapper = mount(<Calendar reservations={[]} view={'checkOut'} datePicker={()=>{}} checkInDate={''} checkOutDate={''} />);
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().subtract(1, 'M').format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().subtract(1, 'M').format('YYYY-MM'));
    expect(wrapper.exists('.week6')).toBe(false);
    for(let i = 0; i < 5; i++) {
      wrapper.find('.previousMonth').simulate('click');
    }
    expect(wrapper.exists('.week6')).toBe(true);
    while(wrapper.find('.calendar-month-description').text() !== "February 2015"){
      wrapper.find('.previousMonth').simulate('click');
    }
    expect(wrapper.exists('.week5')).toBe(false);
  });
  test('should show correct monthy after clicking next month arrow, modifying state.month', () => {
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.text()).toContain(moment().add(1, 'M').format('MMMM YYYY'));
    expect(Object.keys(wrapper.state())).toEqual(['month']);
    expect(wrapper.state().month.format('YYYY-MM')).toBe(moment().add(1, 'M').format('YYYY-MM'));
    expect(wrapper.exists('.week6')).toBe(false);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.exists('.week6')).toBe(true);
  });
  test('should have dates starting with 1 and ending on last day of the shown month', () => {
    expect(wrapper.text()).toContain(moment().endOf('M').format('DD'));
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.text().slice(-5)).toContain(moment().add(1, 'M').endOf('M').format('DD'));
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.text().slice(-5)).toContain(moment().add(2, 'M').endOf('M').format('DD'));
  });
  test('should have booked dates unavailable to select',() => {
    const spy = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkIn'} datePicker={spy} checkInDate={''} checkOutDate={''} />);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkOut'} datePicker={spy} checkInDate={''} checkOutDate={''} />);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkIn'} datePicker={spy} checkInDate={'2019-12-7'} checkOutDate={''} />);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkOut'} datePicker={spy} checkInDate={''} checkOutDate={'2019-12-8'} />);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.unavailable').at(0).simulate('click');
    wrapper.find('.unavailable').at(1).simulate('click');
    wrapper.find('.unavailable').at(2).simulate('click');
    expect(spy.called).toBe(false);
  });
  test('should have available dates able to select', () => {
    const spy = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkIn'} datePicker={spy} checkInDate={''} checkOutDate={''} />);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(0).simulate('click');
    wrapper.find('.available').at(1).simulate('click');
    wrapper.find('.available').at(2).simulate('click');
    expect(spy.calledThrice).toBe(true);
    const spy2 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkOut'} datePicker={spy2} checkInDate={''} checkOutDate={''} />);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.previousMonth').simulate('click');
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(0).simulate('click');
    wrapper.find('.available').at(1).simulate('click');
    wrapper.find('.available').at(2).simulate('click');
    expect(spy2.calledThrice).toBe(true);
    const spy3 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkOut'} datePicker={spy3} checkInDate={'2020-04-15'} checkOutDate={''} />);
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.nextMonth').simulate('click');
    wrapper.find('.nextMonth').simulate('click');
    expect(wrapper.find('.calendar-month-description').text()).toBe('April 2020');
    wrapper.find('.available').at(0).simulate('click');
    expect(spy3.calledOnce).toBe(true);
    const spy4 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-10", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkOut'} datePicker={spy4} checkInDate={'2019-12-17'} checkOutDate={''} />);
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(0).simulate('click');
    expect(spy4.calledOnce).toBe(true);
    const spy5 = sinon.spy();
    wrapper = mount(<Calendar reservations={[{ startDate: "2019-12-11", endDate: "2019-12-16" }, { startDate: "2019-12-22", endDate: "2020-01-08" }]} view={'checkOut'} datePicker={spy5} checkInDate={'2019-12-6'} checkOutDate={''} />);
    expect(wrapper.find('.calendar-month-description').text()).toBe('December 2019');
    wrapper.find('.available').at(1).simulate('click');
    expect(spy5.calledOnce).toBe(true);
  });
});