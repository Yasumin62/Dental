'use strict'

const routes = [
  require('./routes/todos'),
  require('./routes/booking')
];


// Add access to the app and db objects to each route
module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};
