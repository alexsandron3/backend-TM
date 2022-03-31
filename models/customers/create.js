const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = async (customer) => {
  return await prisma.cliente.create({ data: customer });
};
