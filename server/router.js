const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller.js');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:hostId', express.static(path.join(__dirname, '../public')));

app.get('/api/reservations/allLofts', (req, res) => {
  controller.getAllLofts(req, res);
});

app.get('/api/reservations/:hostId', (req, res) => {
  controller.getOneLoft(req, res);
});

app.post('/api/reservations/:hostId', (req, res) => {
  controller.addOneReservation(req, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
