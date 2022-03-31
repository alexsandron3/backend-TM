const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (user) => {
  return await prisma.users.create({ data: user });
};
