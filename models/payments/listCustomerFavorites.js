const prisma = require('../../utils/prismaClient');

module.exports = async (customerId) => {
  return prisma.pagamento_passeio.findMany({
    where: {
      idCliente: customerId,
    },
    include: {
      passeio: {
        select: {
          nomePasseio: true,
          dataPasseio: true,
        },
      },
    },
  });
};
