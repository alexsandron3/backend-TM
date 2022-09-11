const prisma = require('../../utils/prismaClient');

module.exports = async function (startDate, endDate) {
  const payments = await prisma.$queryRaw`
      SELECT 
        COALESCE(SUM(d.totalDespesas), 0) AS totalDespesas
    FROM
        despesa d
            JOIN
        passeio p ON p.dataPasseio BETWEEN ${startDate} AND ${endDate}
            AND p.idPasseio = d.idPasseio
  `;

  return payments;
};
