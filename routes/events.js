const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');

const prisma = new PrismaClient();

// Listar todos passeios
router.get('/', async (req, res) => {
  const { ocultarEncerrados } = req.query;

  const events = await prisma.passeio.findMany({
    where: {
      statusPasseio: ocultarEncerrados === 'true',
    },
  });
  return res.status(StatusCodes.OK).json({
    events,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

// Listar um passeio específico
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const event = await prisma.passeio.findUnique({
    where: {
      idPasseio: Number(id),
    },
  });
  return res.status(StatusCodes.OK).json({
    event,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
});

// Cadastrar um passeio

router.post('/', async (req, res) => {
  const {
    nomePasseio,
    localPasseio,
    valorPasseio,
    dataPasseio,
    lotacao,
    anotacoes,
    idadeIsencao,
    statusPasseio,
    dataLancamento,
    itensPacote,
    prazoVigencia,
  } = req.body;
  const result = await prisma.$transaction(async (prisma) => {
    const event = await prisma.passeio.create({
      nomePasseio,
      localPasseio,
      valorPasseio,
      dataPasseio,
      lotacao,
      anotacoes,
      idadeIsencao,
      statusPasseio,
      dataLancamento,
      itensPacote,
      prazoVigencia,
    });
    const despesa = await prisma.despesa.create({
      idPasseio: event.idPasseio,
      valorIngresso: 0,
      valorOnibus: 0,
      valorMicro: 0,
      valorVan: 0,
      valorEscuna: 0,
      valorAlmocoCliente: 0,
      valorAlmocoMotorista: 0,
      valorEstacionamento: 0,
      valorGuia: 0,
      valorAutorizacaoTransporte: 0,
      valorTaxi: 0,
      valorKitLanche: 0,
      valorMarketing: 0,
      valorImpulsionamento: 0,
      valorPulseira: 0,
      valorHospedagem: 0,
      valorAereo: 0,
      valorServicos: 0,
      valorSeguroViagem: 0,
      outros: 0,
      quantidadeIngresso: 0,
      quantidadeOnibus: 0,
      quantidadeMicro: 0,
      quantidadeEscuna: 0,
      quantidadeAlmocoCliente: 0,
      quantidadeAlmocoMotorista: 0,
      quantidadeEstacionamento: 0,
      quantidadeGuia: 0,
      quantidadeAutorizacaoTransporte: 0,
      quantidadeTaxi: 0,
      quantidadeMarketing: 0,
      quantidadeKitLanche: 0,
      quantidadeImpulsionamento: 0,
      quantidadePulseira: 0,
      quantidadeHospedagem: 0,
      quantidadeAereo: 0,
      quantidadeServicos: 0,
      quantidadeVan: 0,
      quantidadeSeguroViagem: 0,
      totalDespesas: 0,
    });
    return { event, despesa };
  });
  return res.status(StatusCodes.OK).json({
    result,
    success: 1,
    message: 'Evento cadastrado com sucesso!',
  });
});

module.exports = router;
