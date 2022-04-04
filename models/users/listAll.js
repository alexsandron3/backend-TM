const prisma = require('../../utils/prismaClient');
module.exports = async (req, res, next) => {
  return await prisma.users.findMany();
};
