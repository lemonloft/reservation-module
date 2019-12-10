import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar.jsx';
import styled from 'styled-components';
import moment from 'moment';

const GuestsContainerDiv = styled.div`
  position: relative;
  .guestsDropdownDiv{
    background: white;
    div{
      height: 42px;
      line-height: 42px;
      vertical-align: middle;
    }
    position: absolute;
    z-index: 1;
    margin: 0px;
    width: 300px;
    padding-bottom: 10px;
    border: 1px solid rgb(228, 231, 231);
    font-size: 16px;
    color: rgb(72, 72, 72);
    .guestType {
      float: left;
      padding-left: 15px;
    }
    .circleMinus, .count, .circlePlus {
      width: 25px;
      float: right;
      padding-right: 20px;
      text-align: center;
    }
    .circlePlus, .circleMinus{
      color: rgb(0, 132, 137);
      font-size: 30px;
      cursor: pointer;
    }
    .circleMinus {
      color: rgb(0, 132, 137, 0.5);
      cursor: ${props => {
        if (props.adultCount === 1) {
          return "default";
        } else if (props.childrenCount === 0) {
          return "default";
        } else if (props.infantCount === 0) {
          return "default";
        }
      }}
    }
  }
  .dropbtn{
    cursor: pointer;
    user-select: none;
    width: 302px;
    height: 42px;
    text-align: left;
    background-color: white;
    color: rgb(117, 117, 117);
    padding-left: 15px;
    border: 1px solid rgb(228, 231, 231);
    border-radius: 2px;
    font-size: 16px;
    .caret {
      float: right;
      padding-right: 12px;
    }
    &:focus{
      outline: none;
    }
  }
`;
const CloseGuestsDiv = styled.div`
  float: right;
  color: #008489;
  font-size: 14px;
  padding-right: 20px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const DatesDiv = styled.div`
  border: 1px solid rgb(235, 235, 235);
  border-radius: 2px;
  width: 300px;
  height: 42px;
  display: grid;
  grid-template-columns: 130px 40px 130px;
`;
const CheckInInput = styled.input`
  font-size: 16px;
  border: 0px none;
  border-radius: 3px;
  height: 24px;
  grid-column: 1;
  left: 10px;
  top: 0px;
  color: rgb(72, 72, 72);
  margin: 7px;
  padding-left: 7px;
  background-color: ${props => props.bgColor === 'true' ? '#99ede6' : 'white'};
  &:focus{
    outline: none;
  }
`;
const CheckOutInput = styled.input`
  font-size: 16px;
  border: 0px none;
  border-radius: 3px;
  height: 24px;
  grid-column: 3;
  right: 0px;
  top: 0px;
  color: rgb(72, 72, 72);
  margin: 7px;
  padding-left: 7px;
  &:focus{
    outline: none;
  }
  background-color: ${props => props.bgColor === 'true' ? '#99ede6' : 'white'};
`;
const DatesArrowDiv = styled.div`
  grid-column: 2;
  height: 42px;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
  line-height: 42px;
  color: rgb(72, 72, 72);
`;
const GenInfoDiv = styled.div`
  font-size: 12px;
  line-height: 1.5em;
  color: rgb(72, 72, 72);
  .pricePerNight {
    font-size: 22px;
  }
  .reviews {
    color: #767676;
  }
  .star {
    color: rgb(0, 166, 153);
  }
`;
const GreyLinesPolygon = styled.polygon`
  stroke: rgb(150, 150, 150);
  stroke-width: 2;
`;
const Svg = styled.svg`
  width: 24px;
  height: 12px;
`;
const PriceDiv = styled.div`
  width: 300px;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgb(72, 72, 72);
  border-bottom: 1px solid rgb(228, 231, 231);
  .cost {
    float: right;
  }
  ${props => {
    if(props.feeView === 'totalCost'){
      return 'padding-bottom: 0px; border-bottom: none; font-weight: 550;'
    }
  }}
`;
const BottomBorderDiv = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  width: 300px;
  border: 0.5px solid rgb(228, 231, 231);
`
const ReserveButton = styled.div`
  margin-top: 20px;
  text-align: center;
  vertical-align: middle;
  width: 302px;
  height: 42px;
  background: rgb(255, 90, 95);
  border: 0;
  color: white;
  font-size: 16px;
  line-height: 42px;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:active {
    background: rgb(223, 60, 71);
  }
`
const Div = styled.div`
  z-index: 0;
  height: 1000px;
  width: 100%;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
`
const ReservationBlock = styled.div`
  z-index: 0;
  border: 1px solid rgb(228, 231, 231);
  padding: 10px;
  width: 305px;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      rating: NaN,
      pricePerNight: NaN,
      cleaningFee: NaN,
      serviceFee: NaN,
      reviewCount: NaN,
      reservations: [],
      view: '',
      checkInDate: '',
      checkOutDate: '',
      adults: 1,
      children: 0,
      infants: 0,
      totalGuests: 1
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.datePicker = this.datePicker.bind(this);
    this.modifyGuests = this.modifyGuests.bind(this);
    this.makeReservation = this.makeReservation.bind(this);
    this.renderPrices = this.renderPrices.bind(this);
  }
  componentDidMount() {
    if (!this.state.reservations.length) {
      let url = 'http://localhost:3001/api/reservations';
      if (window.location.pathname.length <= 1) {
        let randomUrl = Math.ceil(Math.random() * 100);
        window.location.replace('http://localhost:3001/' + randomUrl);
      }
      url += window.location.pathname;
      fetch(url, {
        method: 'GET'
      })
        .then(response => response.json())
        .then((data) => {
          this.state.description = data[0].description;
          this.state.rating = Number(data[0].rating);
          this.state.pricePerNight = Number(data[0].pricePerNight);
          this.state.cleaningFee = Number(data[0].cleaningFee);
          this.state.serviceFee = Number(data[0].serviceFee);
          this.state.reviewCount = data[0].reviewCount;
          for (let element of data) {
            this.state.reservations.push({ startDate: element.startDate, endDate: element.endDate });
          }
          this.setState((state) => (state));
        })
        .catch(err => {
          console.log('err: ', err)
        });
    }
  }
  clickHandler(e) {
    if (e.target.placeholder || e.target.innerText === '→') {
      if (e.target.innerText === '→') {
        return;
      } else if (e.target.placeholder === 'Check-in') {
        this.setState({ view: 'checkIn' });
      } else {
        this.setState({ view: 'checkOut' });
      }
    } else if (e.target.id === 'closeguests') {
      this.setState({ view: '' });
    } else if (document.getElementById('calendar-div') !== null && !document.getElementById('calendar-div').contains(e.target)) {
      this.setState({ view: '' });
    } else if (e.target.className === 'caret' || e.target.className === 'dropbtn' || (document.getElementById('guestsDropdownDiv') !== null && document.getElementById('guestsDropdownDiv').contains(e.target))) {
      this.setState({ view: 'guests' });
    } else if (this.state.view === 'guests' && e.target.className !== 'dropbtn') {
      this.setState({ view: '' });
    }
  }
  datePicker(date) {
    if (date.clearDates) {
      this.setState({ checkInDate: '', checkOutDate: '' });
    } else if (date.checkInDate) {
      if (this.state.checkInDate.length > 0 || Date.parse(date.checkInDate) >= Date.parse(this.state.checkOutDate)) {
        this.state.checkOutDate = '';
      }
      this.setState({ checkInDate: date.checkInDate });
      if (this.state.checkOutDate.length === 0) {
        this.setState({ view: 'checkOut' });
      } else {
        this.setState({ view: '' });
      }
    } else if (date.checkOutDate) {
      this.setState({ checkOutDate: date.checkOutDate });
      if (this.state.checkInDate.length === 0) {
        this.setState({ view: 'checkIn' });
      } else {
        this.setState({ view: '' });
      }
    }
  }
  dateParser(date) {
    if (date === '') {
      return '';
    }
    return moment(date).format('MM/DD/YYYY');
  }
  renderCalendar() {
    if (this.state.view === 'checkIn') {
      return (
        <div>
          <Calendar reservations={this.state.reservations} view={this.state.view} datePicker={this.datePicker} checkInDate={this.state.checkInDate} checkOutDate={this.state.checkOutDate} />
        </div>
      );
    } else if (this.state.view === 'checkOut') {
      return (
        <div>
          <Calendar reservations={this.state.reservations} view={this.state.view} datePicker={this.datePicker} checkInDate={this.state.checkInDate} checkOutDate={this.state.checkOutDate} />
        </div>
      );
    }
  }
  renderGuests() {
    if (this.state.view === 'guests') {
      return (
        <div id='guestsDropdownDiv' className='guestsDropdownDiv'>
          <div id='adults'><div className="guestType">Adults</div><div className="circlePlus" onClick={(e) => this.modifyGuests(e)}>&#8853;</div><div className="count">{this.state.adults}</div><div className="circleMinus" onClick={(e) => this.modifyGuests(e)}>&#8854;</div></div>
          <div id='children'><div className="guestType">Children</div><div className="circlePlus" onClick={(e) => this.modifyGuests(e)}>&#8853;</div><div className="count">{this.state.children}</div><div className="circleMinus" onClick={(e) => this.modifyGuests(e)}>&#8854;</div></div>
          <div id='infants'><div className="guestType">Infants</div><div className="circlePlus" onClick={(e) => this.modifyGuests(e)}>&#8853;</div><div className="count">{this.state.infants}</div><div className="circleMinus" onClick={(e) => this.modifyGuests(e)}>&#8854;</div></div>
          <CloseGuestsDiv id="closeguests" onClick={this.clickHandler}>Close</CloseGuestsDiv>
        </div>
      );
    }
  }
  renderPrices() {
    if (this.state.checkInDate.length > 0 && this.state.checkOutDate.length > 0) {
      const totalNights = moment(this.state.checkOutDate).diff(moment(this.state.checkInDate), 'days');
      let nightsText = "night";
      if (totalNights > 1) {
        nightsText += 's';
      }
      return (
        <div>
          <PriceDiv>${this.state.pricePerNight} x {totalNights} {nightsText}<div className="cost">${this.state.pricePerNight * totalNights}</div></PriceDiv>
          <PriceDiv>Cleaning fee<div className="cost">${this.state.cleaningFee}</div></PriceDiv>
          <PriceDiv>Service fee<div className="cost">${this.state.serviceFee}</div></PriceDiv>
          <PriceDiv feeView="totalCost">Total<div className="cost">${(this.state.serviceFee * 100 + this.state.cleaningFee * 100 + (this.state.pricePerNight * totalNights) * 100) / 100}</div></PriceDiv>
        </div>
      )
    } else {
      return;
    }
  }
  modifyGuests(e) {
    if (e.target.parentElement.id === 'adults') {
      if (e.target.className === 'circlePlus') {
        this.setState({ adults: this.state.adults + 1, totalGuests: this.state.adults + this.state.children + 1 });
      } else if (e.target.className === 'circleMinus' && this.state.adults > 1) {
        this.setState({ adults: this.state.adults - 1, totalGuests: this.state.adults + this.state.children - 1 });
      }
    } else if (e.target.parentElement.id === 'children') {
      if (e.target.className === 'circlePlus') {
        this.setState({ children: this.state.children + 1, totalGuests: this.state.adults + this.state.children + 1 });
      } else if (e.target.className === 'circleMinus' && this.state.children > 0) {
        this.setState({ children: this.state.children - 1, totalGuests: this.state.adults + this.state.children - 1 });
      }
    } else if (e.target.parentElement.id === 'infants') {
      if (e.target.className === 'circlePlus') {
        this.setState({ infants: this.state.infants + 1 });
      } else if (e.target.className === 'circleMinus' && this.state.infants > 0) {
        this.setState({ infants: this.state.infants - 1 });
      }
    }
  }
  makeReservation() {
    if (this.state.checkInDate.length === 0) {
      this.setState({ view: 'checkIn' });
    } else if (this.state.checkOutDate.length === 0) {
      this.setState({ view: 'checkOut' });
    } else {
      let newReservation = {
        startDate: this.state.checkInDate,
        endDate: this.state.checkOutDate
      }
      let url = 'http://localhost:3001/api/reservations';
      if (window.location.pathname.length > 1) {
        url += window.location.pathname;
      }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(newReservation),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          this.setState({
            reservations: [],
            view: '',
            checkInDate: '',
            checkOutDate: '',
            adults: 1,
            children: 0,
            infants: 0,
            totalGuests: 1
          });
          this.componentDidMount();
        })
    }
  }
  render() {
    if (this.state.reservations.length === 0) {
      return (
        <div></div>
      )
    }
    else {
      let caret = (
        <Svg>
          <GreyLinesPolygon points="0,12 12,0" />
          <GreyLinesPolygon points="12,0 24,12" />
        </Svg>
      );
      if(this.state.view === 'guests'){
        caret = (
          <Svg>
            <GreyLinesPolygon points="0,0 12,12" />
            <GreyLinesPolygon points="12,12 24,0" />
          </Svg>
        )
      }
      let guestsText = 'guest';
      if(this.state.totalGuests > 1) {
        guestsText += 's';
      }
      return (
        <Div onClick={this.clickHandler}>
          <ReservationBlock>
            <GenInfoDiv><span className="pricePerNight">${this.state.pricePerNight}</span> per night<br /><span className="star">&#9733;</span> {this.state.rating} <span className="reviews">({this.state.reviewCount} reviews)</span></GenInfoDiv>
            <BottomBorderDiv></BottomBorderDiv>
            <GenInfoDiv>Dates</GenInfoDiv>
            <DatesDiv id="datesSelection">
              <CheckInInput id="checkin" placeholder="Check-in" readOnly bgColor={(this.state.view === 'checkIn').toString()} value={this.dateParser(this.state.checkInDate)} />
              <DatesArrowDiv>→</DatesArrowDiv>
              <CheckOutInput id="checkout" placeholder="Checkout" readOnly bgColor={(this.state.view === 'checkOut').toString()} value={this.dateParser(this.state.checkOutDate)} />
            </DatesDiv>
            {this.renderCalendar()}
            <GuestsContainerDiv>
              <GenInfoDiv><br />Guests</GenInfoDiv>
              <button className="dropbtn">{this.state.totalGuests} {guestsText}<div className="caret">{caret}</div></button>
              {this.renderGuests()}
            </GuestsContainerDiv>
            {this.renderPrices()}
            <ReserveButton onClick={this.makeReservation}>Reserve</ReserveButton>
          </ReservationBlock>
        </Div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('ReservationModule'));