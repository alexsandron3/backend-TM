const {
  CLIENTE_PARCEIRO,
  PAGAMENTO_QUITADO,
  CLIENTE_CRIANÇA,
} = require('../../utils/constants');
const prisma = require('../../utils/prismaClient');

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
