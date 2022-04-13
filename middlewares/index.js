const error = require('./error');
const validateCustomer = require('./validateCustomer');
const validateJWT = require('./validateJWT');
const validateLogin = require('./validateLogin');
const validateNewUser = require('./validateNewUser');
const validatePayment = require('./validatePayment');

module.exports = {
  error,
  validateCustomer,
  validateLogin,
  validateNewUser,
  validatePayment,
  validateJWT,
};
