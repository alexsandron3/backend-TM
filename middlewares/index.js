const error = require('./error');
const validateCustomer = require('./validateCustomer');
const validateJWT = require('./validateJWT');
const validateLogin = require('./validateLogin');
const validateNewUser = require('./validateNewUser');
const validatePayment = require('./validatePayment');
const validateEditPayment = require('./validateEditPayment');

module.exports = {
  error,
  validateCustomer,
  validateLogin,
  validateNewUser,
  validatePayment,
  validateJWT,
  validateEditPayment,
};
