const { StatusCodes } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log('first');
  if (err.statusCode) {
    return res.status(err.statusCode).json({ success: 0, message: err.message });
  }

  if (err.details) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: 0, message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: 0, essage: `Internal server error: ${err}` });
};
