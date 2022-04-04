const prisma = require('../../utils/prismaClient');
module.exports = async (id) => {
  return await prisma.users.findFirst({ where: { id: Number(id) } });
};
