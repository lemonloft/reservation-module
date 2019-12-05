import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar.jsx';
import { thisExpression } from '@babel/types';

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
      loftUrls: [],
      view: '',
      checkInDate: '',
      checkOutDate: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.datePicker = this.datePicker.bind(this);
  }
  componentDidMount() {
    if (!this.state.reservations.length) {
      fetch('/allLofts', {
        method: 'GET'
      })
        .then(response => response.json())
        .then((data) => {
          let index = Math.floor(Math.random() * 100);
          this.state.description = data[index].description;
          this.state.rating = Number(data[index].rating);
          this.state.pricePerNight = Number(data[index].pricePerNight);
          this.state.cleaningFee = Number(data[index].cleaningFee);
          this.state.serviceFee = Number(data[index].serviceFee);
          this.state.reviewCount = data[index].reviewCount;
          for (const element of data) {
            this.state.loftUrls.push(element.url);
          }
          fetch(`/reservations?q=${data[index].url}`, {
            method: 'GET'
          })
            .then(response => response.json())
            .then((resData) => {
              this.state.reservations = resData.slice();
              this.setState((state) => (state));
            })
            .catch(err => {
              console.log('err: ', err);
            })
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
    if (date.checkInDate) {
      if(this.state.checkInDate.length > 0 || Date.parse(date.checkInDate) >= Date.parse(this.state.checkOutDate)){
        this.state.checkOutDate = '';
      }
      this.setState({ checkInDate: date.checkInDate });
      if (this.state.checkOutDate.length === 0) {
        this.setState({ view: 'checkOut' });
      } else {
        this.setState({ view: '' });
      }
    } else {
      this.setState({ checkOutDate: date.checkOutDate });
      if (this.state.checkInDate.length === 0) {
        this.setState({ view: 'checkIn' });
      } else {
        this.setState({ view: '' });
      }
    }
  }
  renderCalendar() {
    if (this.state.view === '') {
      return undefined;
    } else if (this.state.view === 'checkIn') {
      return (
        <div>
          View check in:
          <Calendar reservations={this.state.reservations} view={this.state.view} datePicker={this.datePicker} checkInDate={this.state.checkInDate} checkOutDate={this.state.checkOutDate} />
        </div>
      );
    } else {
      return (
        <div>
          View check out:
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
      let info = {
        rating: this.state.rating,
        pricePerNight: this.state.pricePerNight,
        cleaningFee: this.state.cleaningFee,
        serviceFee: this.state.serviceFee,
        reservations: this.state.reservations,
        reviewCount: this.state.reviewCount
      };
      return (
        <div onClick={this.clickHandler}>
          <div>Description: {this.state.description}</div>
          <div>${this.state.pricePerNight} per night<br />&#9733; {this.state.rating} ({this.state.reviewCount} reviews)</div>
          <input id="checkin" placeholder="Check-in" readOnly value={this.state.checkInDate} />
          <span>→</span>
          <input id="checkout" placeholder="Checkout" readOnly value={this.state.checkOutDate} />
          {this.renderCalendar()}
          <div>Suggested Locations: {this.state.loftUrls.slice(0, 10)}</div>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));