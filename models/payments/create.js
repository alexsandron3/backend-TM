const prisma = require('../../utils/prismaClient');

module.exports = async (data) => {
  return prisma.pagamento_passeio.create({
    data,
  });
};
