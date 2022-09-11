const prisma = require('../../utils/prismaClient');
module.exports = async (event) => {
  return await prisma.passeio.create({ data: event });
};
