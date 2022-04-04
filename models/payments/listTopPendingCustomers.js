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
  // console.log(allPayments);

  // Contar quantidade de pagamentos pendentes por cliente
  const paymentsByClient = allPayments.reduce((acc, pagamento) => {
    const { cliente } = pagamento;
    if (acc[cliente.nomeCliente]) {
      acc[cliente.nomeCliente] += 1;
    } else {
      acc[cliente.nomeCliente] = 1;
    }
    return acc;
  }, {});
  // Ordernar do maior para o menor
  const sortedPaymentsByClient = Object.entries(paymentsByClient).sort(
    (a, b) => b[1] - a[1],
  );

  return Object.fromEntries(sortedPaymentsByClient);
};
