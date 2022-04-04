const { PrismaClient } = require('@prisma/client');
const {
  CLIENTE_PARCEIRO,
  PAGAMENTO_QUITADO,
  CLIENTE_CRIANÇA,
} = require('../../utils/constants');
const prisma = new PrismaClient();

module.exports = async () => {
  const allPayments = await prisma.pagamento_passeio.findMany({
    where: {
      statusPagamento: {
        notIn: [CLIENTE_PARCEIRO, PAGAMENTO_QUITADO, CLIENTE_CRIANÇA],
      },
    },
    include: {
      cliente: true,
    },
  });

  return allPayments;
};
