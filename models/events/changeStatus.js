const prisma = require('../../utils/prismaClient');

module.exports = async (id, status) => {
  return await prisma.passeio.update({
    where: { idPasseio: id },
    data: {
      statusPasseio: status,
    },
  });
};
