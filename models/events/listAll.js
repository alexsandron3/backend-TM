const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (ocultarEncerrados) => {
  const events = await prisma.passeio.findMany({
    where: {
      statusPasseio: ocultarEncerrados === 'true',
    },
  });
  return events;
};
