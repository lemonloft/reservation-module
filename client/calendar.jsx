import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const OuterMostDiv = styled.div`
  position: relative;
`
const GreyLinesPolygon = styled.polygon`
  stroke: rgb(228, 231, 231);
  stroke-width: 1;
`
const WhiteLinePolygon = styled.polygon`
  stroke: white;
  stroke-width: 2;
`
const Svg = styled.svg`
  position: absolute;
  height: 10px;
  margin: 0px;
  z-index: 2;
  top: 0;
`
const CalendarBlockDiv = styled.div`
  position: absolute;
  top: 9px;
  z-index: 1;
  margin: 0px;
  width: 300px;
  padding-bottom: 10px;
  border: 1px solid rgb(228, 231, 231);
  background-color: white;
`;
const ClearDatesDiv = styled.div`
  text-align: right;
  color: #008489;
  font-size: 14px;
  padding-top: 4px;
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const MonthSelectionButton = styled.button`
  cursor: pointer;
  user-select: none;
  width: 38px;
  height: 30px;
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
`;
const TableDayTd = styled.td`
  width: 38px;
  text-align: center;
  color: rgb(117, 117, 117);
  font-size: 12px;
`;
const UnavailableDateTd = styled.td`
  width: 37px;
  height: 36px;
  border: 1px double ${props => props.picked === 'true' ? "rgb(0, 166, 153)" : "rgb(228, 231, 231)"};
  color: ${props => props.picked === 'true' ? "white" : "rgb(216, 216, 216)"};
  background: ${props => props.picked === 'true' ? "rgb(0, 166, 153)" : "white"};
  text-align: center;
  justify-content: center;
  font-size: 14px;
  text-decoration: ${props => props.picked === 'true' ? "none" : "line-through"};
`;
const AvailableDateTd = styled.td`
  cursor: pointer;
  width: 37px;
  height: 36px;
  border: 1px double ${props => props.picked === 'true' ? "rgb(0, 166, 153)" : "rgb(228, 231, 231)"};
  background: ${props => {
    if (props.picked === 'true') {
      return "rgb(0, 166, 153)";
    } else if (props.hoverColor === 'true') {
      return "rgb(178, 241, 236)";
    } else {
      return "white";
    }
  }};
  text-align: center;
  justify-content: center;
  font-size: 14px;
  color: ${props => (props.picked === 'true' || props.hoverColor === 'true') ? "white" : "rgb(72, 72, 72)"};
  &:hover {
    background: ${props => {
    if (props.picked === 'true') {
      return "rgb(0, 166, 153)";
    } else if (props.hoverColor === 'true') {
      return "rgb(178, 241, 236)";
    } else {
      return "rgb(228, 231, 231)";
    }
  }};
  }
`;
const Table = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0px;
  background-color: white;
`;
const Th = styled.th`
  padding-top: 10px;
  padding-bottom: 10px;
`

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment(),
      hoverDate: ''
    };
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.hoverDateSetter = this.hoverDateSetter.bind(this);
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
  hoverDateSetter(date) {
    this.setState({ hoverDate: date });
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

    let startDay = this.state.month.startOf('M').format('DD');
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
      let checkInRange = [];
      if (this.props.checkOutDate.length > 0) {
        let reservedDates = this.props.reservations.slice();
        reservedDates.sort((a, b) => {
          return Date.parse(a.startDate) - Date.parse(b.startDate);
        });
        for (let i = 0; i < reservedDates.length; i++) {
          if (i === 0 && Date.parse(this.props.checkOutDate) < Date.parse(reservedDates[i].startDate)) {
            let pushedDate = Date.parse(moment().format('YYYY-MM-DD')) + 86400000;
            while (pushedDate < Date.parse(this.props.checkOutDate)) {
              checkInRange.push(pushedDate);
              pushedDate += 86400000;
            }
            break;
          } else if (i === reservedDates.length - 1 && Date.parse(this.props.checkOutDate) > Date.parse(reservedDates[i].endDAte)) {
            let pushedDate = Date.parse(reservedDates[i].endDate);
            while (pushedDate < Date.parse(this.props.checkOutDate)) {
              checkInRange.push(pushedDate);
              pushedDate += 86400000;
            }
            break;
          } else if (Date.parse(reservedDates[i].endDate) < Date.parse(this.props.checkOutDate) && Date.parse(reservedDates[i + 1].startDate) > Date.parse(this.props.checkOutDate)) {
            let pushedDate = Date.parse(reservedDates[i].endDate);
            while (pushedDate < Date.parse(this.props.checkOutDate)) {
              checkInRange.push(pushedDate);
              pushedDate += 86400000;
            }
            break;
          }
        }
      }

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
        if (i < 10) {
          viewDate += '-0' + i;
        } else {
          viewDate += '-' + i;
        }
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
        if (Date.parse(viewDate) < Date.parse(Date()) || (checkInRange.length > 0 && Date.parse(viewDate) < checkInRange[0]) || !checkDateAvailable(viewDate)) {
          dateElement = (<UnavailableDateTd key={i} picked={(viewDate === this.props.checkOutDate).toString()} className="unavailable">{i}</UnavailableDateTd>);
        } else {
          dateElement = (<AvailableDateTd key={i} className="available checkInDate" picked={(viewDate === this.props.checkOutDate).toString()} onClick={(e) => this.clickDate(e, viewDate)} onMouseEnter={() => { this.hoverDateSetter(viewDate) }} onMouseLeave={() => { this.hoverDateSetter('') }} hoverColor={(Date.parse(viewDate) < Date.parse(this.props.checkOutDate) && Date.parse(viewDate) >= Date.parse(this.state.hoverDate)).toString()}>{i}</AvailableDateTd>)
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
    } else if (this.props.view === 'checkOut') {
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
        if (i < 10) {
          viewDate += '-0' + i;
        } else {
          viewDate += '-' + i;
        }
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

        if (viewDate === this.props.checkInDate) {
          dateElement = (<UnavailableDateTd key={i} className="unavailable" picked="true">{i}</UnavailableDateTd>);
        } else if (Date.parse(viewDate) < Date.parse(Date()) + 86400000 || !checkDateAvailable(viewDate)) {
          dateElement = (<UnavailableDateTd key={i} className="unavailable">{i}</UnavailableDateTd>);
        } else if (this.props.checkInDate.length === 0) {
          dateElement = (<AvailableDateTd key={i} className="available checkOutDate" onClick={(e) => this.clickDate(e, viewDate)}>{i}</AvailableDateTd>)
        } else {
          dateElement = (<AvailableDateTd key={i} className="available checkOutDate" onClick={(e) => this.clickDate(e, viewDate)} hoverColor={(Date.parse(viewDate) <= Date.parse(this.state.hoverDate)).toString()} onMouseEnter={() => { this.hoverDateSetter(viewDate) }} onMouseLeave={() => { this.hoverDateSetter('') }}>{i}</AvailableDateTd>)
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
  renderPolygon() {
    if (this.props.view === 'checkIn') {
      return (
        <Svg>
          <GreyLinesPolygon points="40,10 50,0" />
          <GreyLinesPolygon points="50,0 60,10" />
          <WhiteLinePolygon points="41,10 59,10" />
        </Svg>
      )
    } else if (this.props.view === 'checkOut') {
      return (
        <Svg>
          <GreyLinesPolygon points="210,10 220,0" />
          <GreyLinesPolygon points="220,0 230,10" />
          <WhiteLinePolygon points="211,10 229,10" />
        </Svg>
      )
    }
  }
  render() {
    return (
      <OuterMostDiv>
        {this.renderPolygon()}
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
      </OuterMostDiv>
    )
  }
}

export default Calendar;