const prisma = require('../../utils/prismaClient');
module.exports = async (idPasseio) => {
  const payments = await prisma.passeio.findMany({
    where: {
      idPasseio: Number(idPasseio),
    },
  });
  return payments;
};
