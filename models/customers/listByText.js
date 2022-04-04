const prisma = require('../../utils/prismaClient');
module.exports = async (text, ocultarInativos) => {
  return await prisma.cliente.findMany({
    where: {
      OR: [
        {
          nomeCliente: {
            contains: text,
          },
          statusCliente: ocultarInativos === 'true',
        },
        {
          cpfCliente: {
            contains: text,
          },
          statusCliente: ocultarInativos === 'true',
        },
        {
          telefoneCliente: {
            contains: text,
          },
          statusCliente: ocultarInativos === 'true',
        },
        {
          referencia: {
            contains: text,
          },
          statusCliente: ocultarInativos === 'true',
        },
      ],
    },
  });
};
