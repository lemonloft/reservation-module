const faker = require('faker');
const reservationsGenerator = require('./reservationsGenerator.js');
const { Loft } = require('../db');
const { Reservation } = require('../db');

const loftSynonyms = ['apartment', 'hostel', 'hotel', 'inn', 'lodge', 'motel', 'resort', 'shelter', 'abode', 'castle', 'palace', 'room', 'lodging', 'penthouse', 'studio', 'house', 'mansion'];

const seedFn = (() => {
  for (let i = 1; i <= 100; i++) {
    const lodging = {};
    const adjective = faker.commerce.productAdjective();
    const loftSynonym = loftSynonyms[Math.floor(Math.random() * loftSynonyms.length)];
    const city = faker.address.city();
    lodging.id = i;
    lodging.description = `${adjective} ${loftSynonym} in ${city}`;
    lodging.pricePerNight = Math.ceil(Math.random() * (200 - 20) + 20);
    lodging.cleaningFee = (Math.ceil(Math.random() * (3000 - 500) + 500)) / 100;
    lodging.serviceFee = (Math.ceil(Math.random() * (3000 - 500) + 500)) / 100;
    lodging.rating = (Math.ceil(Math.random() * (500 - 100) + 100)) / 100;
    lodging.url = `${adjective}${loftSynonym}${i}`;
    lodging.reviewCount = Math.ceil(Math.random() * (500 - 5) + 5);
    const reservations = reservationsGenerator(i);
    Loft.create(lodging)
      .then(() => {
        Reservation.bulkCreate(reservations);
      })
      .then(() => { })
      .catch((err) => {
        console.log('There was an error in seeding: ', err);
      });
  }
});
seedFn();
