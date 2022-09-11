const prisma = require('../../utils/prismaClient');

module.exports = async (startDate, endDate) => {
  const payments = await prisma.passeio.findMany({
    where: {
      dataPasseio: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    select: {
      pagamento_passeio: {
        where: {
          statusPagamento: {
            notIn: [0, 3],
          },
        },
        include: {
          passeio: {
            select: {
              nomePasseio: true,
              dataPasseio: true,
            },
          },
        },
      },
    },
  });
  return payments;
};
