const userSchema = require('../schemas/user');
module.exports = async (req, res, next) => {
  console.log('opa');
  try {
    await userSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    next(error);
  }
};
