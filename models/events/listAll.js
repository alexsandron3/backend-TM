const prisma = require('../../utils/prismaClient');
module.exports = async (ocultarEncerrados) => {
  const events = await prisma.passeio.findMany({
    where: {
      OR: [
        { statusPasseio: true },
        ocultarEncerrados === 'false' ? { statusPasseio: false } : null,
      ],
    },
  });
  return events;
};
