const prisma = require('../../utils/prismaClient');

// Listar eventos por data de inicio e fim
module.exports = async (startDate, endDate) => {
  const events = await prisma.passeio.findMany({
    where: {
      dataPasseio: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });
  return events;
};
