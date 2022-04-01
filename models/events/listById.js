const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (idPasseio) => {
  const payments = await prisma.passeio.findMany({
    where: {
      idPasseio: Number(idPasseio),
    },
  });
  return payments;
};
