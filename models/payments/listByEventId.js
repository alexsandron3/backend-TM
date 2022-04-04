const prisma = require('../../utils/prismaClient');

module.exports = async (idPasseio) => {
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      idPasseio: Number(idPasseio),
    },
  });
  return payments;
};
