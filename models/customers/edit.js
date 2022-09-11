const prisma = require('../../utils/prismaClient');

module.exports = async (data, customerId) => {
  return prisma.cliente.update({
    where: {
      idCliente: customerId,
    },
    data,
  });
};
