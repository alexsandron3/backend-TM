const prisma = require('../../utils/prismaClient');

module.exports = async (id) => {
  const event = await prisma.passeio.delete({
    where: {
      idPasseio: id,
    },
  });
  return event;
};
