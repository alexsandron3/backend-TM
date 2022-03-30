const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (id) => {
  const payment = await prisma.pagamento_passeio.findUnique({
    where: {
      idPagamento: Number(id),
    },
  });
  return payment;
};
