const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = async (ocultarEncerrados) => {
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      statusPagamento: ocultarEncerrados === 'true',
    },
  });
  return payments;
};
