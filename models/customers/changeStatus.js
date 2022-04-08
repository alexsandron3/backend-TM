const prisma = require('../../utils/prismaClient');

module.exports = async (id, status) => {
  return await prisma.cliente.update({
    where: { idCliente: id },
    data: {
      statusCliente: status,
    },
  });
};
