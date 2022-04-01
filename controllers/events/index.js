const { StatusCodes } = require('http-status-codes');

const { event } = require('../../models/');

async function listAll(req, res) {
  const { ocultarEncerrados } = req.query;
  const events = await event.listAll(ocultarEncerrados);
  return res.status(StatusCodes.OK).json({
    events,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listById(req, res) {
  const { id } = req.params;
  const events = await event.listById(id);
  return res.status(StatusCodes.OK).json({
    events,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}
// Listar eventos por data de inicio e fim

async function listByStartEndDate(req, res) {
  const { startDate, endDate } = req.query;
  const events = await event.listByStartEndDate(startDate, endDate);
  return res.status(StatusCodes.OK).json({
    events,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listByText(req, res) {
  const { wordToSearch } = req.params;
  const { ocultarEncerrados } = req.query;
  const events = await event.listByText(wordToSearch, ocultarEncerrados);
  return res.status(StatusCodes.OK).json({
    events,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

module.exports = {
  listAll,
  listById,
  listByStartEndDate,
  listByText,
};
