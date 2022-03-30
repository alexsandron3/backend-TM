const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const moment = require('moment');

module.exports = async (startDate, endDate) => {
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      dataPagamento: {
        gte: moment(startDate).toISOString(),
        lte: moment(endDate).toISOString(),
      },
    },
  });
  return payments;
};
