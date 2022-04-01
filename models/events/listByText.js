const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Listar evento por texto
module.exports = async (wordToSearch, ocultarEncerrados) => {
  const events = await prisma.passeio.findMany({
    where: {
      nomePasseio: {
        contains: wordToSearch,
      },
      localPasseio: {
        contains: wordToSearch,
      },
      statusPasseio: ocultarEncerrados === 'true',
    },
  });
  return events;
};
