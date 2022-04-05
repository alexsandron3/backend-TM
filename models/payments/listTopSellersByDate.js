const prisma = require('../../utils/prismaClient');

module.exports = async (startDate, endDate) => {
  const allPayments = await prisma.pagamento_passeio.findMany({
    where: {
      dataPagamentoEfetuado: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    include: {
      cliente: {
        select: {
          nomeCliente: true,
        },
      },
      passeio: {
        select: {
          nomePasseio: true,
          dataPasseio: true,
        },
      },
      users: {
        select: {
          username: true,
        },
      },
    },
  });

  return allPayments;
};
