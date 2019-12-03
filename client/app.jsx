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
      reservations: [/*Array of objects of two dates representing reservations*/],
      loftUrls: [/*Array of strings of urls to click on to see other lofts*/]
    };
  }
  componentDidMount() {
    if(!this.state.reservations.length){
      fetch('/allLofts', {
        method: 'GET'
      })
        .then(response => response.json())
        .then((data) => {
          let index = Math.floor(Math.random()*100);
          this.state.description = data[index].description;
          this.state.rating = data[index].rating;
          this.state.pricePerNight = data[index].pricePerNight;
          this.state.cleaningFee = data[index].cleaningFee;
          this.state.serviceFee = data[index].serviceFee;
          for (const element of data){
            this.state.loftUrls.push(element.url);
          }
          fetch(`/reservations?q=${data[index].url}`,{
            method:'GET'
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
  // componentDidMount() {
  //   fetch('/allLofts', {
  //     method: 'GET'
  //   })
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log(data);
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
  //         .then((datum) => {
  //           console.log(datum);
  //         })
  //         .catch(err => {
  //           console.log('err: ', err);
  //         });
  //       })
  //     })
  //     .catch(err => {
  //       console.log('err: ', err)
  //     });
  // }
  render() {
    return (
      <div>
        <div>Description: {this.state.description}</div>
        <Reservation />
        <Calendar />
        <div>Suggested Locations: {this.state.loftUrls.slice(0,10)}</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));