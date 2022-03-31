const { PrismaClient } = require('@prisma/client');
const customerSchema = require('../schemas/customer');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  const { nomeCliente, cpfCliente } = req.body;
  try {
    await customerSchema.validateAsync(req.body);
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
    return next();
  } catch (error) {
    next(error);
  }
};
