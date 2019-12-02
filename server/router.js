const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const controller = require ('./controller.js');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/allLofts', (req, res) => {
  controller.getAllLofts(req, res);
});

app.get('/reservations', (req, res) => {
  controller.getOneLoft(req, res);
});

app.post('/reservations', (req, res) => {
  controller.addOneReservation(req, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));