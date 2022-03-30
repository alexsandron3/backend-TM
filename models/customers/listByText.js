const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = async (text) => {

  return await prisma.cliente.findMany({
    where: {
      OR: [
        {
          nomeCliente: {
            contains: text,
          },
        },
        {
          cpfCliente: {
            contains: text,
          },
        },
        {
          telefoneCliente: {
            contains: text,
          },
        },
        {
          referencia: {
            contains: text,
          },
        },
      ],
    },
  });
};
