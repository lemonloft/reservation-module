/* This file generates 1 - 10 reservations (randomly decided) upto 90 days from the day this script is ran.
It creates and returns an array of objects to be 'bulk created' in the bookings file. 
Input: loft_id (int)
Output: bulkReservations (array) */

const moment = require('moment');

var reservationGenerator = (loft_id) => {
  let numReservations = Math.floor(Math.random() * 10) + 1;
  let numDays = numReservations * 2;
  let days = {};
  let reservations = [];
  for (let i = 0; i < numDays; i++) {
    let day = Math.floor(Math.random() * 90) + 1;
    while (days[day] === true) {
      day = Math.floor(Math.random() * 90) + 1;
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
    reservation.startDate = moment().add(reservationDates[j], 'days').calendar();
    reservation.endDate = moment().add(reservationDates[j + 1], 'days').calendar();
    reservations.push(reservation);
  }
  return reservations;
}

module.exports.reservationGenerator = reservationGenerator;