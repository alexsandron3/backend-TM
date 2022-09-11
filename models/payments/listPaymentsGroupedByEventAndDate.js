const prisma = require('../../utils/prismaClient');

module.exports = async (startDate, endDate) => {
  const groupedPayments = await prisma.$queryRaw`
    SELECT SUM(pp.valorPago) as totalPago, count(pp.idPagamento) AS numeroVendas, SUM(pp.valorVendido) AS total, p.nomePasseio, p.dataPasseio, p.idPasseio FROM pagamento_passeio pp JOIN passeio p ON p.idPasseio=pp.idPasseio AND pp.dataPagamentoEfetuado BETWEEN ${new Date(
      startDate,
    )} AND ${new Date(endDate)} GROUP BY pp.idPasseio;`;

  return groupedPayments;
};
