import React from 'react';
import Calendar from './calendar.jsx';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.info.rating,
      pricePerNight: props.info.pricePerNight,
      cleaningFee: props.info.cleaningFee,
      serviceFee: props.info.serviceFee,
      reviewCount: props.info.reviewCount,
      reservations: props.info.reservations.slice(),
      view: props.calendarView
    };
  }

  renderCalendar() {
    if (this.state.view === '') {
      return undefined;
    } else if (this.state.view === 'checkIn') {
      return (<Calendar reservations={this.state.reservations} view={this.state.view} />);
    } else {
      return (<Calendar reservations={this.state.reservations} view={this.state.view} />);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.calendarView !== prevProps.calendarView) {
      this.setState({ view: this.props.calendarView });
    }
  }

  render() {
    return (
      <div>
        <div>${this.state.pricePerNight} per night<br />&#9733; {this.state.rating} ({this.state.reviewCount} reviews)</div>
        <input id="checkin" placeholder="Check-in" readOnly />
        <span>→</span>
        <input id="checkout" placeholder="Checkout" readOnly />
        {this.renderCalendar()}
      </div>
    )
  }
}

export default Reservation;