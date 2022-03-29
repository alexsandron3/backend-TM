const express = require('express');
const router = express.Router();
const moment = require('moment');
const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const {
  CLIENTE_INTERESSADO,
  CLIENTE_CONFIRMADO,
  PAGAMENTO_QUITADO,
  CLIENTE_PARCEIRO,
  CLIENTE_CRIANÇA,
} = require('../utils/constants');

const prisma = new PrismaClient();

// Listar todos pagamentos
router.get('/', async (req, res) => {
  const { ocultarEncerrados } = req.query;
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      statusPagamento: ocultarEncerrados === 'true',
    },
  });
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

//Listar um pagamento pelo id do pagamento
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const payment = await prisma.pagamento_passeio.findUnique({
    where: {
      idPagamento: Number(id),
    },
  });
  return res.status(StatusCodes.OK).json({
    payment,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

// Listar um pagamento pelo id do cliente e id do passeio
router.get('/cliente/:idCliente/passeio/:idPasseio', async (req, res) => {
  const { idCliente, idPasseio } = req.params;
  const payment = await prisma.pagamento_passeio.findUnique({
    where: {
      idCliente: Number(idCliente),
      idPasseio: Number(idPasseio),
    },
  });
  return res.status(StatusCodes.OK).json({
    payment,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

//Listar pagamentos e passeios baseado em uma data inicial e uma data final
router.get('/data/:dataInicial/:dataFinal', async (req, res) => {
  const { dataInicial, dataFinal } = req.params;
  const payments = await prisma.passeio.findMany({
    where: {
      dataPasseio: {
        gte: moment(dataInicial).toISOString(),
        lte: moment(dataFinal).toISOString(),
      },
    },
    include: {
      pagamento_passeio: true,
    },
  });

  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

// Listar varios pagamentos baseado no id e datas inicial e final do passeio
router.get('/passeio/:idPasseio', async (req, res) => {
  const { idPasseio } = req.params;
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      idPasseio: Number(idPasseio),
    },
  });
  //
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

// Listar pagamentos baseado em uma data inicial e final e contar os status de pagamento
router.get('/data/:dataInicial/:dataFinal/status', async (req, res) => {
  const { dataInicial, dataFinal } = req.params;
  const payments = await prisma.pagamento_passeio.findMany({
    where: {
      dataPagamento: {
        gte: moment(dataInicial).toISOString(),
        lte: moment(dataFinal).toISOString(),
      },
    },
    include: {
      passeio: true,
    },
  });
  const status = {
    pendente: 0,
    pago: 0,
    cancelado: 0,
    encerrado: 0,
  };
  payments.forEach((payment) => {
    if (payment.statusPagamento === 'pendente') {
      status.pendente += 1;
    } else if (payment.statusPagamento === 'pago') {
      status.pago += 1;
    } else if (payment.statusPagamento === 'cancelado') {
      status.cancelado += 1;
    } else if (payment.statusPagamento === 'encerrado') {
      status.encerrado += 1;
    }
  });
  return res.status(StatusCodes.OK).json({
    status,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

module.exports = router;
