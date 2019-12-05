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
    let week = [
      <td key="blankDate1" className="table-date"></td>,
      <td key="blankDate2" className="table-date"></td>,
      <td key="blankDate3" className="table-date"></td>,
      <td key="blankDate4" className="table-date"></td>,
      <td key="blankDate5" className="table-date"></td>,
      <td key="blankDate6" className="table-date"></td>,
      <td key="blankDate7" className="table-date"></td>
    ];

    let startDay = this.state.month.startOf('M').format('dd');
    let endDate = this.state.month.endOf('M').format('DD');

    let week1 = week.slice();
    let week2 = week.slice();
    let week3 = week.slice();
    let week4 = week.slice();
    let week5 = [];
    let week6 = [];
    let week5helper = () => {
      if (week5.length > 0) {
        return (
          <tr className="table-date-border">
            {week5}
          </tr>
        );
      } else {
        return null;
      }
    }
    let week6helper = () => {
      if (week6.length > 0) {
        return (
          <tr className="table-date-border">
            {week6}
          </tr>
        );
      } else {
        return null;
      }
    }
    if (Number(endDate) > 28 || startDay != 'Su') {
      week5 = week.slice();
    }
    if (Number(endDate) === 30 && startDay === 'Sa') {
      week6 = week.slice();
    }
    if (Number(endDate) === 31 && (startDay === 'Fr' || startDay === 'Sa')) {
      week6 = week.slice();
    }

    if (this.props.view === 'checkIn') {
      let tdHelper = (i) => {
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
          return (<td key={i} className="table-date unavailable">{i}</td>);
        } else {
          return (<td key={i} className="table-date available checkInDate" onClick={(e) => this.clickDate(e, viewDate)}>{i}</td>)
        }
      }
      if (startDay === 'Su') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 7) {
            week1[i - 1] = tdHelper(i);
          } else if (i <= 14) {
            week2[i - 8] = tdHelper(i);
          } else if (i <= 21) {
            week3[i - 15] = tdHelper(i);
          } else if (i <= 28) {
            week4[i - 22] = tdHelper(i);
          } else if (i <= 31) {
            week5[i - 29] = tdHelper(i);
          }
        }
      } else if (startDay === 'Mo') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 6) {
            week1[i] = tdHelper(i);
          } else if (i <= 13) {
            week2[i - 7] = tdHelper(i);
          } else if (i <= 20) {
            week3[i - 14] = tdHelper(i);
          } else if (i <= 27) {
            week4[i - 21] = tdHelper(i);
          } else if (i <= 34) {
            week5[i - 28] = tdHelper(i);
          }
        }
      } else if (startDay === 'Tu') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 5) {
            week1[i + 1] = tdHelper(i);
          } else if (i <= 12) {
            week2[i - 6] = tdHelper(i);
          } else if (i <= 19) {
            week3[i - 13] = tdHelper(i);
          } else if (i <= 26) {
            week4[i - 20] = tdHelper(i);
          } else if (i <= 33) {
            week5[i - 27] = tdHelper(i);
          }
        }
      } else if (startDay === 'We') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 4) {
            week1[i + 2] = tdHelper(i);
          } else if (i <= 11) {
            week2[i - 5] = tdHelper(i);
          } else if (i <= 18) {
            week3[i - 12] = tdHelper(i);
          } else if (i <= 25) {
            week4[i - 19] = tdHelper(i);
          } else if (i <= 32) {
            week5[i - 26] = tdHelper(i);
          }
        }
      } else if (startDay === 'Th') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 3) {
            week1[i + 3] = tdHelper(i);
          } else if (i <= 10) {
            week2[i - 4] = tdHelper(i);
          } else if (i <= 17) {
            week3[i - 11] = tdHelper(i);
          } else if (i <= 24) {
            week4[i - 18] = tdHelper(i);
          } else if (i <= 31) {
            week5[i - 25] = tdHelper(i);
          }
        }
      } else if (startDay === 'Fr') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 2) {
            week1[i + 4] = tdHelper(i);
          } else if (i <= 9) {
            week2[i - 3] = tdHelper(i);
          } else if (i <= 16) {
            week3[i - 10] = tdHelper(i);
          } else if (i <= 23) {
            week4[i - 17] = tdHelper(i);
          } else if (i <= 30) {
            week5[i - 24] = tdHelper(i);
          } else if (i <= 37) {
            week6[i - 31] = tdHelper(i);
          }
        }
      } else if (startDay === 'Sa') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 1) {
            week1[i + 5] = tdHelper(i);
          } else if (i <= 8) {
            week2[i - 2] = tdHelper(i);
          } else if (i <= 15) {
            week3[i - 9] = tdHelper(i);
          } else if (i <= 22) {
            week4[i - 16] = tdHelper(i);
          } else if (i <= 29) {
            week5[i - 23] = tdHelper(i);
          } else if (i <= 36) {
            week6[i - 30] = tdHelper(i);
          }
        }
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
      let tdHelper = (i) => {
        let viewDate = this.state.month.format('YYYY-MM');
        viewDate += '-' + i;
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
          return (<td key={i} className="table-date unavailable">{i}</td>);
        } else {
          return (<td key={i} className="table-date available checkOutDate" onClick={(e) => this.clickDate(e, viewDate)}>{i}</td>)
        }
      }
      if (startDay === 'Su') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 7) {
            week1[i - 1] = tdHelper(i);
          } else if (i <= 14) {
            week2[i - 8] = tdHelper(i);
          } else if (i <= 21) {
            week3[i - 15] = tdHelper(i);
          } else if (i <= 28) {
            week4[i - 22] = tdHelper(i);
          } else if (i <= 31) {
            week5[i - 29] = tdHelper(i);
          }
        }
      } else if (startDay === 'Mo') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 6) {
            week1[i] = tdHelper(i);
          } else if (i <= 13) {
            week2[i - 7] = tdHelper(i);
          } else if (i <= 20) {
            week3[i - 14] = tdHelper(i);
          } else if (i <= 27) {
            week4[i - 21] = tdHelper(i);
          } else if (i <= 34) {
            week5[i - 28] = tdHelper(i);
          }
        }
      } else if (startDay === 'Tu') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 5) {
            week1[i + 1] = tdHelper(i);
          } else if (i <= 12) {
            week2[i - 6] = tdHelper(i);
          } else if (i <= 19) {
            week3[i - 13] = tdHelper(i);
          } else if (i <= 26) {
            week4[i - 20] = tdHelper(i);
          } else if (i <= 33) {
            week5[i - 27] = tdHelper(i);
          }
        }
      } else if (startDay === 'We') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 4) {
            week1[i + 2] = tdHelper(i);
          } else if (i <= 11) {
            week2[i - 5] = tdHelper(i);
          } else if (i <= 18) {
            week3[i - 12] = tdHelper(i);
          } else if (i <= 25) {
            week4[i - 19] = tdHelper(i);
          } else if (i <= 32) {
            week5[i - 26] = tdHelper(i);
          }
        }
      } else if (startDay === 'Th') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 3) {
            week1[i + 3] = tdHelper(i);
          } else if (i <= 10) {
            week2[i - 4] = tdHelper(i);
          } else if (i <= 17) {
            week3[i - 11] = tdHelper(i);
          } else if (i <= 24) {
            week4[i - 18] = tdHelper(i);
          } else if (i <= 31) {
            week5[i - 25] = tdHelper(i);
          }
        }
      } else if (startDay === 'Fr') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 2) {
            week1[i + 4] = tdHelper(i);
          } else if (i <= 9) {
            week2[i - 3] = tdHelper(i);
          } else if (i <= 16) {
            week3[i - 10] = tdHelper(i);
          } else if (i <= 23) {
            week4[i - 17] = tdHelper(i);
          } else if (i <= 30) {
            week5[i - 24] = tdHelper(i);
          } else if (i <= 37) {
            week6[i - 31] = tdHelper(i);
          }
        }
      } else if (startDay === 'Sa') {
        for (let i = 1; i <= Number(endDate); i++) {
          if (i <= 1) {
            week1[i + 5] = tdHelper(i);
          } else if (i <= 8) {
            week2[i - 2] = tdHelper(i);
          } else if (i <= 15) {
            week3[i - 9] = tdHelper(i);
          } else if (i <= 22) {
            week4[i - 16] = tdHelper(i);
          } else if (i <= 29) {
            week5[i - 23] = tdHelper(i);
          } else if (i <= 36) {
            week6[i - 30] = tdHelper(i);
          }
        }
      }
    }
    return (
      <tbody id={this.props.view}>
        <tr className="table-day-noborder">
          {tableDays}
        </tr>
        <tr className="table-date-border">
          {week1}
        </tr>
        <tr className="table-date-border">
          {week2}
        </tr>
        <tr className="table-date-border">
          {week3}
        </tr>
        <tr className="table-date-border">
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