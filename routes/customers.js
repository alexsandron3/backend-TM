const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');

const prisma = new PrismaClient();

// Listar todos clientes
router.get('/', async (req, res) => {
  const { ocultarInativos } = req.query;
  const customers = await prisma.cliente.findMany({
    where: {
      OR: [
        { statusCliente: true },
        ocultarInativos === 'false' ? { statusCliente: false } : null,
      ],
    },
  });
  return res.status(StatusCodes.OK).json({
    customers,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

router.get('/:wordToSearch', async (req, res) => {
  const { wordToSearch } = req.params;
  const customer = await prisma.cliente.findMany({
    where: {
      OR: [
        {
          nomeCliente: {
            contains: wordToSearch,
          },
        },
        {
          cpfCliente: {
            contains: wordToSearch,
          },
        },
        {
          telefoneCliente: {
            contains: wordToSearch,
          },
        },
        {
          referencia: {
            contains: wordToSearch,
          },
        },
      ],
    },
  });
  return res.status(StatusCodes.OK).json({
    customer,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  const customer = await prisma.cliente.findUnique({
    where: {
      idCliente: Number(id),
    },
  });
  return res.status(StatusCodes.OK).json({
    customer,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

module.exports = router;
