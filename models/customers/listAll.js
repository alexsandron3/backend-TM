const prisma = require('../../utils/prismaClient');
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
