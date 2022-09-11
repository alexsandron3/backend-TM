const userSchema = require('../schemas/user');
module.exports = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    next(error);
  }
};
