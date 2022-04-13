const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  // log: ['query', 'info', 'error', 'warn'],
});

prisma.$on('query', (e) => {
  // console.log('Params: ', e.params);
});
module.exports = prisma;
