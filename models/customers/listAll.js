const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = async (ocultarInativos) => {
  return await prisma.cliente.findMany({
    where: {
      OR: [
        { statusCliente: true },
        ocultarInativos === 'false' ? { statusCliente: false } : null,
      ],
    },
  });
};
