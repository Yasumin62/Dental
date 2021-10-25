'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  db = require('./server/config/db.js'),
  env = require('./server/config/env'),
  router = require('./server/router/index');
  
const path = require('path');

const app = express();
const PORT = env.PORT;

app.use(express.static(__dirname + '/public'));
app.use('/home', express.static(path.join(__dirname, '/public/home.html')))
app.use('/booking', express.static(path.join(__dirname, '/public/home.html')))
app.use('/cancle_booking', express.static(path.join(__dirname, '/public/cancle_booking.html')))
app.use('/edit_booking', express.static(path.join(__dirname, '/public/edit_booking.html')))
app.use('/calendar', express.static(path.join(__dirname, '/public/calendar.html')))
app.use('/contact', express.static(path.join(__dirname, '/public/contact.html')))

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router(app, db);

//drop and resync with { force: true }
db.sequelize.sync().then(() => {

  app.listen(PORT, () => {
    console.log('Express listening on port:', 'http://localhost:' + PORT);
  });
});
