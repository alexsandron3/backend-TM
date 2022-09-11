const prisma = require('../../utils/prismaClient');

module.exports = async (ocultarEncerrados) => {
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      OR: [
        { statusPasseio: true },
        ocultarEncerrados === 'false' ? { statusPasseio: false } : null,
      ],
    },
  });
  return payments;
};
