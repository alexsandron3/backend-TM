const { StatusCodes } = require('http-status-codes');

const { payment } = require('../../models/');

async function listAll(req, res) {
  const { ocultarEncerrados } = req.query;
  const payments = await payments.listAll(ocultarEncerrados);
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listById(req, res) {
  const { id } = req.params;
  const payments = await payment.listById(id);
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listByCustomerIdAndEventId(req, res) {
  const { idCliente, idPasseio } = req.params;
  const payments = await payment.listByCustomerIdAndEventId(
    idCliente,
    idPasseio,
  );
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listByEventStartEndDate(req, res) {
  const { dataInicial, dataFinal } = req.params;
  const payments = await payment.listByEventStartEndDate(
    dataInicial,
    dataFinal,
  );
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listByEventId(req, res) {
  const { idPasseio } = req.params;
  const payments = await payment.listByEventId(idPasseio);
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

module.exports = {
  listAll,
  listById,
  listByCustomerIdAndEventId,
  listByEventStartEndDate,
  listByEventId,
};
