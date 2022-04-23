const customerSchema = require('../schemas/customer');
const prisma = require('../utils/prismaClient');
const { messages } = require('joi-translation-pt-br');

module.exports = async (req, res, next) => {
  const { nomeCliente, cpfCliente } = req.body;
  try {
    const validatedCustomer = await customerSchema.validateAsync(req.body, {
      messages,
    });
    const customerExists = await prisma.cliente.findFirst({
      where: {
        cpfCliente,
        nomeCliente,
      },
    });
    if (customerExists) {
      return res.status(400).json({
        success: 0,
        message: 'Cliente já cadastrado!',
      });
    }
    req.customerData = validatedCustomer;
    return next();
  } catch (error) {
    next(error);
  }
};
