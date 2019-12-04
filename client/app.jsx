import React from 'react';
import ReactDOM from 'react-dom';
import Reservation from './reservation.jsx';
import Calendar from './calendar.jsx';

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
      calendarView: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
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
        this.setState({ calendarView: 'checkIn' });
      } else {
        this.setState({ calendarView: 'checkOut' });
      }
    } else if (document.getElementById('calendar-div') !== null && !document.getElementById('calendar-div').contains(e.target)) {
      this.setState({ calendarView: '' });
    }
    // } else if (document.getElementById('checkIn') !== null || e.target.placeholder === 'Check-in') {
    //   this.setState({ calendarView: 'checkIn' });
    // } else if (document.getElementById('checkOut') !== null || e.target.placeholder === 'Checkout') {
    //   this.setState({ calendarView: 'checkOut' });
    // }
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
          <Reservation info={info} calendarView={this.state.calendarView} />
          {/* <Calendar reservations={this.state.reservations} /> */}
          <div>Suggested Locations: {this.state.loftUrls.slice(0, 10)}</div>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));