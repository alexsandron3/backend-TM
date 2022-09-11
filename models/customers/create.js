const prisma = require('../../utils/prismaClient');
module.exports = async (customer) => {
  return await prisma.cliente.create({ data: customer });
};
