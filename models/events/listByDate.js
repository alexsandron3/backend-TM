const prisma = require('../../utils/prismaClient');

module.exports = async (date, ocultarEncerrados) => {
  return await prisma.passeio.findMany({
    where: {
      dataPasseio: {
        equals: date,
      },
      OR: [
        { statusPasseio: true },
        ocultarEncerrados === 'false' ? { statusPasseio: false } : null,
      ],
    },
  });
};
