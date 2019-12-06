const Sequelize = require('sequelize');

var sequelize = new Sequelize('LemonLoft', 'loftuser', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
    .authenticate()
    .then(function (err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database: ', err);
    });
    
var Loft = sequelize.define('lofts', {
  'id': {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'description': {
    type: Sequelize.STRING(500)
  },
  'pricePerNight': {
    type: Sequelize.DECIMAL
  },
  'cleaningFee': {
    type: Sequelize.DECIMAL
  },
  'serviceFee': {
    type: Sequelize.DECIMAL
  },
  'rating': {
    type: Sequelize.DECIMAL
  },
  'url': {
    type: Sequelize.STRING(100)
  },
  'reviewCount': {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

var Reservation = sequelize.define('reservations', {
  'res_id': {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'loft_id': {
    type: Sequelize.INTEGER
  },
  'startDate': {
    type: Sequelize.DATE
  },
  'endDate': {
    type: Sequelize.DATE
  }
}, {
  timestamps: false
});

module.exports.getAllLofts = (cb) => {
  Loft.findAll()
  .then(allLoftData => {
    cb(null, allLoftData);
  })
  .catch(err => {
    console.log('There was an error getting all loft data: ', err);
  });
};

module.exports.getOneLoft = (url, cb) => {
  sequelize.query(`SELECT reservations.startDate, reservations.endDate FROM lofts, reservations WHERE lofts.url = "${url}" AND lofts.id = reservations.loft_id`)
  .then(data => {
    cb(null, data);
  })
  .catch(err => {
    console.log('There was an error getting loft data: ', err);
  });
}

module.exports.addOneReservation = (reservation, cb) => {
  Reservation.upsert(reservation)
  .then(() => {
    cb(null, 'SUCCESS');
  })
  .catch(err => {
    console.log('There was an error upserting in sqlize: ', err);
  });
}

module.exports.db = sequelize;
module.exports.Loft = Loft;
module.exports.Reservation = Reservation;