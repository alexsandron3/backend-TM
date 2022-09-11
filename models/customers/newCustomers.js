const prisma = require('../../utils/prismaClient');

module.exports = async (startDate, endDate) => {
  const newCustomers = await prisma.cliente.findMany({
    where: {
      created: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });
  return newCustomers;
};
