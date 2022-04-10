const prisma = require('../../utils/prismaClient');

module.exports = async (idPasseio) => {
  const payments = await prisma.passeio.findUnique({
    where: {
      idPasseio: Number(idPasseio),
    },
    include: {
      pagamento_passeio: {
        include: {
          cliente: {
            select: {
              nomeCliente: true,
              orgaoEmissor: true,
              cpfCliente: true,
              rgCliente: true,
              referencia: true,
              telefoneCliente: true,
              dataNascimento: true,
            },
          },
        },
      },
    },
  });
  return payments;
};
