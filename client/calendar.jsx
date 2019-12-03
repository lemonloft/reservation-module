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
    this.setState((state) => (state));
  }

  nextMonth() {
    this.state.month.add(1, 'M');
    this.setState((state) => (state));
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
    if (startDay === 'Su') {
      for (let i = 1; i <= Number(endDate); i++) {
        if (i <= 7) {
          week1[i - 1] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 14) {
          week2[i - 8] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 21) {
          week3[i - 15] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 28) {
          week4[i - 22] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 31) {
          week5[i - 29] = <td key={i} className="table-date unavailable">{i}</td>;
        }
      }
    } else if (startDay === 'Mo') {
      for (let i = 1; i <= Number(endDate); i++) {
        if (i <= 6) {
          week1[i] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 13) {
          week2[i - 7] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 20) {
          week3[i - 14] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 27) {
          week4[i - 21] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 34) {
          week5[i - 28] = <td key={i} className="table-date unavailable">{i}</td>;
        }
      }
    } else if (startDay === 'Tu') {
      for (let i = 1; i <= Number(endDate); i++) {
        if (i <= 5) {
          week1[i + 1] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 12) {
          week2[i - 6] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 19) {
          week3[i - 13] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 26) {
          week4[i - 20] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 33) {
          week5[i - 27] = <td key={i} className="table-date unavailable">{i}</td>;
        }
      }
    } else if (startDay === 'We') {
      for (let i = 1; i <= Number(endDate); i++) {
        if (i <= 4) {
          week1[i + 2] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 11) {
          week2[i - 5] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 18) {
          week3[i - 12] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 25) {
          week4[i - 19] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 32) {
          week5[i - 26] = <td key={i} className="table-date unavailable">{i}</td>;
        }
      }
    } else if (startDay === 'Th') {
      for (let i = 1; i <= Number(endDate); i++) {
        if (i <= 3) {
          week1[i + 3] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 10) {
          week2[i - 4] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 17) {
          week3[i - 11] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 24) {
          week4[i - 18] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 31) {
          week5[i - 25] = <td key={i} className="table-date unavailable">{i}</td>;
        }
      }
    } else if (startDay === 'Fr') {
      for (let i = 1; i <= Number(endDate); i++) {
        if (i <= 2) {
          week1[i + 4] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 9) {
          week2[i - 3] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 16) {
          week3[i - 10] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 23) {
          week4[i - 17] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 30) {
          week5[i - 24] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 37) {
          week6[i - 31] = <td key={i} className="table-date unavailable">{i}</td>;
        }
      }
    } else if (startDay === 'Sa') {
      for (let i = 1; i <= Number(endDate); i++) {
        if (i <= 1) {
          week1[i + 5] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 8) {
          week2[i - 2] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 15) {
          week3[i - 9] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 22) {
          week4[i - 16] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 29) {
          week5[i - 23] = <td key={i} className="table-date unavailable">{i}</td>;
        } else if (i <= 36) {
          week6[i - 30] = <td key={i} className="table-date unavailable">{i}</td>;
        }
      }
    }
    return (
      <tbody>
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
      <div>
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