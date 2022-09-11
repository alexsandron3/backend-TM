const prisma = require('../../utils/prismaClient');
module.exports = async (id) => {
  return await prisma.cliente.findUnique({
    where: {
      idCliente: Number(id),
    },
  });
};
