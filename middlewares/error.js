const { StatusCodes } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log('first');
  if (err.statusCode) {
    return res.status(err.statusCode).json({ Message: err.message });
  }

  if (err.details) {
    return res.status(StatusCodes.BAD_REQUEST).json({ Message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ Message: `Internal server error: ${err}` });
};
