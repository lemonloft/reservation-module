/* This file generates 1 - 10 reservations (randomly decided) upto 90 days from the day this script is ran.
It creates and returns an array of objects to be 'bulk created' in the bookings file. 
Input: loft_id (int)
Output: bulkReservations (array) */

const moment = require('moment');

module.exports = (loft_id) => {
  let numReservations = Math.floor(Math.random() * 10) + 1;
  let numDays = numReservations * 2;
  let days = {};
  let reservations = [];
  for (let i = 0; i < numDays; i++) {
    let day = Math.ceil(Math.random() * 90);
    while (days[day] === true) {
      day = Math.ceil(Math.random() * 90);
    }
    days[day] = true;
  }
  let reservationDates = Object.keys(days).map((element) => {
    return Number(element);
  })
  reservationDates.sort((a, b) => {
    return a - b;
  });
  for (let j = 0; j < reservationDates.length; j += 2) {
    let reservation = {};
    reservation.loft_id = loft_id;
    reservation.startDate = moment().add(reservationDates[j], 'days').format('YYYY[-]MM[-]DD');
    reservation.endDate = moment().add(reservationDates[j + 1], 'days').format('YYYY[-]MM[-]DD');
    reservations.push(reservation);
  }
  return reservations;
}