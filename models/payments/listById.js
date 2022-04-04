const prisma = require('../../utils/prismaClient');

module.exports = async (id) => {
  const payment = await prisma.pagamento_passeio.findUnique({
    where: {
      idPagamento: Number(id),
    },
  });
  return payment;
};
