import React from 'react';
import Calendar from './calendar.jsx';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <div>Hello from Reservation</div>
        <div>From within Reservation: (<Calendar />)</div>
      </div>
    )
  }
}

export default Reservation;