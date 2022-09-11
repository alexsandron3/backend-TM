const prisma = require('../../utils/prismaClient');

module.exports = async (idCliente, idPasseio) => {
  const payment = await prisma.pagamento_passeio.findFirst({
    where: {
      idCliente: Number(idCliente),
      idPasseio: Number(idPasseio),
    },
  });
  return payment;
};
