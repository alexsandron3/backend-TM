const { PrismaClient } = require('@prisma/client');
const {
  CLIENTE_PARCEIRO,
  PAGAMENTO_QUITADO,
} = require('../../utils/constants');
const prisma = new PrismaClient();

module.exports = async () => {
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      statusPagamento: {
        notIn: [CLIENTE_PARCEIRO, PAGAMENTO_QUITADO],
      },
    },
    include: {
      passeio: true,
      cliente: true,
    },
  });
  return payments;
};
