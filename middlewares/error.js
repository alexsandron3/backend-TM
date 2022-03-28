const { StatusCodes } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // console.error(err);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: `Internal server error: ${err.message}` });
};
