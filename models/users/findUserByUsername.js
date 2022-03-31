const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (username) => {
  return await prisma.users.findFirst({ where: { username } });
};
