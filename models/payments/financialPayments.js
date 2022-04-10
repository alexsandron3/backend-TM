const prisma = require('../../utils/prismaClient');

module.exports = async function (startDate, endDate) {
  const payments = await prisma.$queryRaw`
      SELECT 
        COALESCE(ABS(SUM(pp.valorPendente)), 0) AS pendente,
        COALESCE(SUM(pp.taxaPagamento), 0) AS taxasDePagamento,
        COALESCE(SUM(pp.valorPago), 0) AS recebimentos,
        COALESCE(COUNT(pp.idPagamento), 0) AS pagantes
    FROM
        pagamento_passeio pp
            JOIN
        passeio p ON pp.idPasseio = p.idPasseio
            AND p.dataPasseio BETWEEN ${startDate} AND ${endDate}
            AND pp.statusPagamento NOT IN (0);
  `;
  return payments;
};
