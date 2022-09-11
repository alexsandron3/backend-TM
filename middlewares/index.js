const error = require('./error');
const validateNewCustomer = require('./validateNewCustomer');
const validateJWT = require('./validateJWT');
const validateLogin = require('./validateLogin');
const validateNewUser = require('./validateNewUser');
const validatePayment = require('./validatePayment');
const validateEditPayment = require('./validateEditPayment');
const validateNewEvent = require('./validateNewEvent');

module.exports = {
  error,
  validateNewCustomer,
  validateLogin,
  validateNewUser,
  validatePayment,
  validateJWT,
  validateEditPayment,
  validateNewEvent,
};
