const { updateCustomerSchema } = require('../schemas/customer');
const prisma = require('../utils/prismaClient');
const { messages } = require('joi-translation-pt-br');

module.exports = async (req, res, next) => {
  try {
    const validatedCustomer = await updateCustomerSchema.validateAsync(
      req.body,
      {
        messages,
      },
    );

    req.customerData = validatedCustomer;
    return next();
  } catch (error) {
    next(error);
  }
};
