const { StatusCodes } = require('http-status-codes');

const { event } = require('../../models/');

async function listAll(req, res, next) {
  const { ocultarEncerrados } = req.query;
  try {
    const events = await event.listAll(ocultarEncerrados);
    return res.status(StatusCodes.OK).json({
      events,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listById(req, res, next) {
  const { id } = req.params;
  try {
    const events = await event.listById(id);
    return res.status(StatusCodes.OK).json({
      events,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}
// Listar eventos por data de inicio e fim

async function listByStartEndDate(req, res, next) {
  const { startDate, endDate } = req.query;
  try {
    const events = await event.listByStartEndDate(startDate, endDate);
    return res.status(StatusCodes.OK).json({
      events,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listByText(req, res, next) {
  const { wordToSearch } = req.params;
  const { ocultarEncerrados } = req.query;
  try {
    const events = await event.listByText(wordToSearch, ocultarEncerrados);
    return res.status(StatusCodes.OK).json({
      events,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function changeStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.query;
  try {
    await event.changeStatus(Number(id), JSON.parse(status));
    const message = JSON.parse(status)
      ? 'Evento ativado com sucesso!'
      : 'Evento desativado com sucesso!';
    return res.status(StatusCodes.OK).json({
      success: 1,
      message,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listAll,
  listById,
  listByStartEndDate,
  listByText,
  changeStatus,
};
