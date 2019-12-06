import React from 'react';
import moment from 'moment';

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
    } else {
      whichDate.checkOutDate = date;
    }
    this.props.datePicker(whichDate);
  }

  renderMonth() {
    let tableDays = [
      <td key="Su" className="table-day">Su</td>,
      <td key="Mo" className="table-day">Mo</td>,
      <td key="Tu" className="table-day">Tu</td>,
      <td key="We" className="table-day">We</td>,
      <td key="Th" className="table-day">Th</td>,
      <td key="Fr" className="table-day">Fr</td>,
      <td key="Sa" className="table-day">Sa</td>
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
          <tr className="table-date-border week5">
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
          <tr className="table-date-border week6">
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
          dateElement = (<td key={i} className="table-date unavailable">{i}</td>);
        } else {
          dateElement = (<td key={i} className="table-date available checkInDate" onClick={(e) => this.clickDate(e, viewDate)}>{i}</td>)
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
          dateElement = (<td key={i} className="table-date unavailable">{i}</td>);
        } else {
          dateElement = (<td key={i} className="table-date available checkOutDate" onClick={(e) => this.clickDate(e, viewDate)}>{i}</td>)
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
        <tr className="table-day-noborder">
          {tableDays}
        </tr>
        <tr className="table-date-border week1">
          {week1}
        </tr>
        <tr className="table-date-border week2">
          {week2}
        </tr>
        <tr className="table-date-border week3">
          {week3}
        </tr>
        <tr className="table-date-border week4">
          {week4}
        </tr>
        {week5helper()}
        {week6helper()}
      </tbody>
    );
  }

  render() {
    return (
      <div id="calendar-div" className="calendar-block">
        <table>
          <thead>
            <tr>
              <th>
                <button className="calendar-month-button previousMonth" type="button" onClick={this.previousMonth}>←</button>
              </th>
              <th colSpan="5" className="calendar-month-description">
                <span>{this.state.month.format('MMMM YYYY')}</span>
              </th>
              <th>
                <button className="calendar-month-button nextMonth" type="button" onClick={this.nextMonth}>→</button>
              </th>
            </tr>
          </thead>
          {this.renderMonth()}
        </table>
      </div>
    )
  }
}

export default Calendar;