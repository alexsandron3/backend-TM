const prisma = require('../../utils/prismaClient');
module.exports = async (username) => {
  return await prisma.users.findFirst({ where: { username } });
};
