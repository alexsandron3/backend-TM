const prisma = require('../../utils/prismaClient');
module.exports = async (user) => {
  return await prisma.users.create({ data: user });
};
