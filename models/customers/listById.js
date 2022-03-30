const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = async (id) => {
  return await prisma.cliente.findUnique({
    where: {
      idCliente: Number(id),
    },
  });
};
