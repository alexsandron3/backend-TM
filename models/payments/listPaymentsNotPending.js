const {
  CLIENTE_PARCEIRO,
  CLIENTE_INTERESSADO,
} = require('../../utils/constants');
const prisma = require('../../utils/prismaClient');

module.exports = async function () {
  const allPayments = await prisma.pagamento_passeio.findMany({
    where: {
      statusPagamento: {
        notIn: [CLIENTE_PARCEIRO, CLIENTE_INTERESSADO],
      },
    },
    include: {
      cliente: {
        select: {
          nomeCliente: true,
          referencia: true,
        },
      },
      passeio: {
        select: {
          nomePasseio: true,
          dataPasseio: true,
        },
      },
    },
  });
  return allPayments;
};
