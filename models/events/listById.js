const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (idPasseio) => {
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      idPasseio: Number(idPasseio),
    },
  });
  return payments;
};
