const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (startDate, endDate, ocultarEncerrados) => {
  const payments = await prisma.passeio.findMany({
    where: {
      dataPasseio: {
        gte: new Date(startDate).toISOString(),
        lte: new Date(endDate).toISOString(),
      },
      OR: [
        { statusPasseio: true },
        ocultarEncerrados === 'false' ? { statusPasseio: false } : null,
      ],
    },
    include: {
      pagamento_passeio: true,
    },
  });
  return payments;
};
