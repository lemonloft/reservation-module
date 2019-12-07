import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar.jsx';
import styled from 'styled-components';
import moment from 'moment';

const Div = styled.div`
  z-index: 0;
  height: 1000px;
  width: 100%;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
`
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
  line-height: 2em;
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
`
const BottomBorderDiv = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  width: 300px;
  border: 0.5px solid rgb(228, 231, 231);
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
      checkOutDate: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.datePicker = this.datePicker.bind(this);
  }
  componentDidMount() {
    if (!this.state.reservations.length) {
      let url = 'http://localhost:3001/api/reservations';
      if (window.location.pathname.length > 1) {
        url += window.location.pathname;
      }
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
            this.state.reservations.push({startDate: element.startDate, endDate: element.endDate});
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
    } else if (document.getElementById('calendar-div') !== null && !document.getElementById('calendar-div').contains(e.target)) {
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
    if(date === '') {
      return '';
    }
    return moment(date).format('MM/DD/YYYY');
  }
  renderCalendar() {
    if (this.state.view === '') {
      return undefined;
    } else if (this.state.view === 'checkIn') {
      return (
        <div>
          <Calendar reservations={this.state.reservations} view={this.state.view} datePicker={this.datePicker} checkInDate={this.state.checkInDate} checkOutDate={this.state.checkOutDate} />
        </div>
      );
    } else {
      return (
        <div>
          <Calendar reservations={this.state.reservations} view={this.state.view} datePicker={this.datePicker} checkInDate={this.state.checkInDate} checkOutDate={this.state.checkOutDate} />
        </div>
      );
    }
  }

  //       let sampleReservation = {
  //         loft_id: 1,
  //         startDate: '2019-12-24',
  //         endDate: '2019-12-26'
  //       }
  //       fetch('/reservations', {
  //         method: 'POST',
  //         body: JSON.stringify(sampleReservation),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       .then(() => {
  //         fetch(`/reservations?q=${data[0].url}`,{
  //           method: 'GET'
  //         })
  //         .then(response => response.json())
  render() {
    if (this.state.reservations.length === 0) {
      return (
        <div></div>
      )
    }
    else {
      console.log("this.state.description: ", this.state.description);
      return (
        <Div onClick={this.clickHandler}>
          <GenInfoDiv><span className="pricePerNight">${this.state.pricePerNight}</span> per night<br /><span className="star">&#9733;</span> {this.state.rating} <span className="reviews">({this.state.reviewCount} reviews)</span></GenInfoDiv>
          <BottomBorderDiv></BottomBorderDiv>
          <GenInfoDiv>Dates</GenInfoDiv>
          <DatesDiv id="datesSelection">
            <CheckInInput id="checkin" placeholder="Check-in" readOnly bgColor={(this.state.view === 'checkIn').toString()} value={this.dateParser(this.state.checkInDate)} />
            <DatesArrowDiv>→</DatesArrowDiv>
            <CheckOutInput id="checkout" placeholder="Checkout" readOnly bgColor={(this.state.view === 'checkOut').toString()} value={this.dateParser(this.state.checkOutDate)} />
          </DatesDiv>
          {this.renderCalendar()}
        </Div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));