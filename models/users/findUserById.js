const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (id) => {
  return await prisma.users.findFirst({ where: { id: Number(id) } });
};
