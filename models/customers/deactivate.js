const prisma = require('../../utils/prismaClient');

module.exports = async (customer) => {
  return await prisma.cliente.update({
    where: { id: customer.id },
    data: {
      statusCliente: false,
    },
  });
};
