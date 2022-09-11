const prisma = require('../../utils/prismaClient');

module.exports = async (data, paymentId) => {
  return prisma.pagamento_passeio.update({
    where: {
      idPagamento: paymentId,
    },
    data,
  });
};
