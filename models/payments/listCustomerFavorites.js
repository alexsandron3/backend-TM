const prisma = require('../../utils/prismaClient');

module.exports = async (customerId) => {
  return prisma.pagamento_passeio.findMany({
    where: {
      idCliente: customerId,
    },
    select: {
      passeio: {
        select: {
          nomePasseio: true,
        },
      },
    },
  });
};
