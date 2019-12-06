import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const CalendarBlockDiv = styled.div`
  width: 280px;
  padding-bottom: 10px;
`;
const ClearDatesDiv = styled.div`
  text-align: right;
  color: #008489;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  padding-top: 4px;
  padding-right: 2px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const MonthSelectionButton = styled.button`
  cursor: pointer;
  user-select: none;
  width: 38px;
  height: 33px;
  text-align: center;
  background-color: white;
  color: rgb(117, 117, 117);
  border: 1px solid rgb(228, 231, 231);
  border-radius: 3px;
  &:hover {
    border: 1px solid rgb(196, 196, 196);
  }
  &:active {
    background: rgb(242, 242, 242);
  }
`;
const CalendarMonthDescriptionTh = styled.th`
  color: rgb(72, 72, 72);
  font-size: 18px;
  text-align: center;
  font-family: Cicular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  padding-bottom: 10px;
`;
const TableDayTd = styled.td`
  width: 38px;
  text-align: center;
  font-family: Cicular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  color: rgb(117, 117, 117);
  font-size: 12px;
`;
const UnavailableDateTd = styled.td`
  border: 1px double rgb(228, 231, 231);
  width: 37px;
  height: 36px;
  border: 1px double rgb(228, 231, 231);
  color: rgb(0, 0, 0);
  background: white;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  color: rgb(216, 216, 216);
  text-decoration: line-through;
  font-family: Cicular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;
const AvailableDateTd = styled.td`
  border: 1px double rgb(228, 231, 231);
  width: 37px;
  height: 36px;
  border: 1px double rgb(228, 231, 231);
  color: rgb(0, 0, 0);
  background: white;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  color: rgb(72, 72, 72);
  font-family: Cicular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  &:hover {
    background: rgb(228, 231, 231)
  }
`;
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0px;
`;
const Th = styled.th`
  padding-bottom: 10px;
`

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment()
    };
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  previousMonth() {
    this.state.month.subtract(1, 'M');
    this.setState({ month: this.state.month });
  }
  nextMonth() {
    this.state.month.add(1, 'M');
    this.setState({ month: this.state.month });
  }
  clickDate(e, date) {
    let whichDate = {};
    if (e.target.className.includes('checkInDate')) {
      whichDate.checkInDate = date;
    } else if (e.target.className.includes('checkOutDate')) {
      whichDate.checkOutDate = date;
    } else if (e.target.innerText === 'Clear dates') {
      whichDate.clearDates = true;
    }
    this.props.datePicker(whichDate);
  }
  renderMonth() {
    let tableDays = [
      <TableDayTd key="Su" className="table-day">Su</TableDayTd>,
      <TableDayTd key="Mo" className="table-day">Mo</TableDayTd>,
      <TableDayTd key="Tu" className="table-day">Tu</TableDayTd>,
      <TableDayTd key="We" className="table-day">We</TableDayTd>,
      <TableDayTd key="Th" className="table-day">Th</TableDayTd>,
      <TableDayTd key="Fr" className="table-day">Fr</TableDayTd>,
      <TableDayTd key="Sa" className="table-day">Sa</TableDayTd>
    ];

    let startDay = this.state.month.startOf('M').format('dd');
    let endDate = this.state.month.endOf('M').format('DD');

    let week1 = [
      <td key="blankDate1" className="table-date"></td>,
      <td key="blankDate2" className="table-date"></td>,
      <td key="blankDate3" className="table-date"></td>,
      <td key="blankDate4" className="table-date"></td>,
      <td key="blankDate5" className="table-date"></td>,
      <td key="blankDate6" className="table-date"></td>,
      <td key="blankDate7" className="table-date"></td>
    ];
    let week2 = [];
    let week3 = [];
    let week4 = [];
    let week5 = [];
    let week6 = [];
    let week5helper = () => {
      if (week5.length > 0) {
        return (
          <tr className="week5">
            {week5}
          </tr>
        );
      } else {
        return undefined;
      }
    }
    let week6helper = () => {
      if (week6.length > 0) {
        return (
          <tr className="week6">
            {week6}
          </tr>
        );
      } else {
        return undefined;
      }
    }

    if (this.props.view === 'checkIn') {
      let tdHelper = (i, startDay) => {
        let dateElement;
        let dayModifier = 0;
        if (startDay === 'Mo') {
          dayModifier = 1;
        } else if (startDay === 'Tu') {
          dayModifier = 2;
        } else if (startDay === 'We') {
          dayModifier = 3;
        } else if (startDay === 'Th') {
          dayModifier = 4;
        } else if (startDay === 'Fr') {
          dayModifier = 5;
        } else if (startDay === 'Sa') {
          dayModifier = 6;
        }
        let viewDate = this.state.month.format('YYYY-MM');
        viewDate += '-' + i;
        let checkDateAvailable = (date) => {
          let checkedDate = Date.parse(date);
          let dayAfter = checkedDate + 86400000;
          for (const element of this.props.reservations) {
            if ((Date.parse(element.startDate) <= checkedDate && Date.parse(element.endDate) >= checkedDate) || (Date.parse(element.startDate) <= dayAfter && Date.parse(element.endDate) >= dayAfter)) {
              return false;
            }
          }
          return true;
        }
        if (Date.parse(viewDate) < Date.parse(Date()) || !checkDateAvailable(viewDate)) {
          dateElement = (<UnavailableDateTd key={i} className="unavailable">{i}</UnavailableDateTd>);
        } else {
          dateElement = (<AvailableDateTd key={i} className="available checkInDate" onClick={(e) => this.clickDate(e, viewDate)}>{i}</AvailableDateTd>)
        }
        if (i <= 7 - dayModifier) {
          week1[dayModifier + i - 1] = dateElement;
        } else if (i <= 14 - dayModifier) {
          week2[dayModifier + i - 8] = dateElement;
        } else if (i <= 21 - dayModifier) {
          week3[dayModifier + i - 15] = dateElement;
        } else if (i <= 28 - dayModifier) {
          week4[dayModifier + i - 22] = dateElement;
        } else if (i <= 35 - dayModifier) {
          week5[dayModifier + i - 29] = dateElement;
        } else if (i <= 42 - dayModifier) {
          week6[dayModifier + i - 36] = dateElement;
        }
      }
      for (let i = 1; i <= Number(endDate); i++) {
        tdHelper(i, startDay);
      }
    } else {
      let checkOutRange = [];
      if (this.props.checkInDate.length > 0) {
        let reservedDates = this.props.reservations.slice();
        reservedDates.sort((a, b) => {
          return Date.parse(a.startDate) - Date.parse(b.startDate);
        });
        for (let i = 0; i < reservedDates.length - 1; i++) {
          if (i === 0 && Date.parse(this.props.checkInDate) < Date.parse(reservedDates[i].startDate)) {
            let pushedDate = Date.parse(this.props.checkInDate) + 86400000;
            while (pushedDate < Date.parse(reservedDates[i].startDate)) {
              checkOutRange.push(pushedDate);
              pushedDate += 86400000;
            }
            break;
          }
          if (Date.parse(reservedDates[i].endDate) < Date.parse(this.props.checkInDate) && Date.parse(reservedDates[i + 1].startDate) > Date.parse(this.props.checkInDate)) {
            let pushedDate = Date.parse(this.props.checkInDate) + 86400000;
            while (pushedDate < Date.parse(reservedDates[i + 1].startDate)) {
              checkOutRange.push(pushedDate);
              pushedDate += 86400000;
            }
            break;
          }
        }
      }
      let tdHelper = (i, startDay) => {
        let viewDate = this.state.month.format('YYYY-MM');
        viewDate += '-' + i;
        let dateElement;
        let dayModifier = 0;
        if (startDay === 'Mo') {
          dayModifier = 1;
        } else if (startDay === 'Tu') {
          dayModifier = 2;
        } else if (startDay === 'We') {
          dayModifier = 3;
        } else if (startDay === 'Th') {
          dayModifier = 4;
        } else if (startDay === 'Fr') {
          dayModifier = 5;
        } else if (startDay === 'Sa') {
          dayModifier = 6;
        }
        let checkDateAvailable = (date) => {
          let checkedDate = Date.parse(date);
          let dayBefore = checkedDate - 86400000;
          if (this.props.checkInDate.length > 0) {
            if (checkedDate <= Date.parse(this.props.checkInDate)) {
              return false;
            }
            if (checkOutRange.length === 0) {
              return true;
            }
            for (let element of checkOutRange) {
              if (element === checkedDate) {
                return true;
              }
            }
            return false;
          } else {
            for (const element of this.props.reservations) {
              if ((Date.parse(element.startDate) <= checkedDate && Date.parse(element.endDate) >= checkedDate) || (Date.parse(element.startDate) <= dayBefore && Date.parse(element.endDate) >= dayBefore)) {
                return false;
              }
            }
          }
          return true;
        }
        if (Date.parse(viewDate) < Date.parse(Date()) + 86400000 || !checkDateAvailable(viewDate)) {
          dateElement = (<UnavailableDateTd key={i} className="unavailable">{i}</UnavailableDateTd>);
        } else {
          dateElement = (<AvailableDateTd key={i} className="available checkOutDate" onClick={(e) => this.clickDate(e, viewDate)}>{i}</AvailableDateTd>)
        }
        if (i <= 7 - dayModifier) {
          week1[dayModifier + i - 1] = dateElement;
        } else if (i <= 14 - dayModifier) {
          week2[dayModifier + i - 8] = dateElement;
        } else if (i <= 21 - dayModifier) {
          week3[dayModifier + i - 15] = dateElement;
        } else if (i <= 28 - dayModifier) {
          week4[dayModifier + i - 22] = dateElement;
        } else if (i <= 35 - dayModifier) {
          week5[dayModifier + i - 29] = dateElement;
        } else if (i <= 42 - dayModifier) {
          week6[dayModifier + i - 36] = dateElement;
        }
      }
      for (let i = 1; i <= Number(endDate); i++) {
        tdHelper(i, startDay);
      }
    }
    return (
      <tbody id={this.props.view}>
        <tr>
          {tableDays}
        </tr>
        <tr className="week1">
          {week1}
        </tr>
        <tr className="week2">
          {week2}
        </tr>
        <tr className="week3">
          {week3}
        </tr>
        <tr className="week4">
          {week4}
        </tr>
        {week5helper()}
        {week6helper()}
      </tbody>
    );
  }
  renderClearDates() {
    if (this.props.checkInDate.length || this.props.checkOutDate.length) {
      return (<ClearDatesDiv onClick={(e) => { this.clickDate(e) }} id="clearDates">Clear dates</ClearDatesDiv>);
    }
  }
  render() {
    return (
      <CalendarBlockDiv id="calendar-div">
        <Table>
          <thead>
            <tr>
              <Th>
                <MonthSelectionButton id="previousMonth" type="button" onClick={this.previousMonth}>←</MonthSelectionButton>
              </Th>
              <CalendarMonthDescriptionTh colSpan="5" id="calendar-month-description">
                {this.state.month.format('MMMM YYYY')}
              </CalendarMonthDescriptionTh>
              <Th>
                <MonthSelectionButton id="nextMonth" type="button" onClick={this.nextMonth}>→</MonthSelectionButton>
              </Th>
            </tr>
          </thead>
          {this.renderMonth()}
        </Table>
        {this.renderClearDates()}
      </CalendarBlockDiv>
    )
  }
}

export default Calendar;