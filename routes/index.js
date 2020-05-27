'use strict';

const userRoute = require('./users');
module.exports = (app) => {
  userRoute(app);
}