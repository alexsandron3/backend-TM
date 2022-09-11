const prisma = require('../../utils/prismaClient');
const {
  CLIENTE_PARCEIRO,
  PAGAMENTO_QUITADO,
  CLIENTE_CRIANÇA,
} = require('../../utils/constants');

module.exports = async () => {
  const allPayments = await prisma.pagamento_passeio.findMany({
    where: {
      statusPagamento: {
        notIn: [CLIENTE_PARCEIRO, PAGAMENTO_QUITADO, CLIENTE_CRIANÇA],
      },
    },
    include: {
      passeio: true,
    },
  });

  return allPayments;
};
