const prisma = require('../../utils/prismaClient');

module.exports = async function (startDate, endDate) {
  const payments = await prisma.$queryRaw`
      SELECT 
        COALESCE(AVG(valorVendido), 0) AS valorMedioVendido
      FROM
        pagamento_passeio pp
            JOIN
        passeio p ON pp.idPasseio = p.idPasseio
            AND p.dataPasseio BETWEEN ${startDate} AND ${endDate}
            AND statusPagamento NOT IN (0 , 3);
  `;

  return payments;
};
