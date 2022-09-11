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

async function deleteEvent(req, res, next) {
  const { id } = req.params;
  try {
    await event.deleteEvent(Number(id));
    return res.status(StatusCodes.OK).json({
      success: 1,
      message: 'Evento excluído com sucesso!',
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      success: 0,
      message:
        'Não foi possível deletar o evento, verifique se existem pagamentos neste evento ou entre em contato com o suporte!',
    });
  }
}

async function listByDate(req, res, next) {
  const { date } = req.params;
  const { ocultarEncerrados } = req.query;
  try {
    const events = await event.listByDate(
      new Intl.DateTimeFormat('pt-BR').format(new Date(date)),
      ocultarEncerrados,
    );
    return res.status(StatusCodes.OK).json({
      events,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const { eventData } = req;
  const { dataPasseio, dataLancamento, prazoVigencia } = eventData;
  const eventWithDatesFormated = {
    ...eventData,
    dataPasseio:
      dataPasseio === '' ? null : new Date(dataPasseio).toISOString(),
    dataLancamento:
      dataLancamento === '' ? null : new Date(dataLancamento).toISOString(),
    prazoVigencia:
      prazoVigencia === '' ? null : new Date(prazoVigencia).toISOString(),
  };

  try {
    const createdEvent = await event.create(eventWithDatesFormated);
    return res.status(StatusCodes.OK).json({
      event: createdEvent,
      success: 1,
      message: 'Evento criado com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function edit(req, res, next) {
  const { id } = req.params;
  const { eventData } = req;
  const { dataPasseio, dataLancamento, prazoVigencia } = eventData;
  const eventWithDatesFormated = {
    ...eventData,
    dataPasseio:
      dataPasseio === '' ? null : new Date(dataPasseio).toISOString(),
    dataLancamento:
      dataLancamento === '' ? null : new Date(dataLancamento).toISOString(),
    prazoVigencia:
      prazoVigencia === '' ? null : new Date(prazoVigencia).toISOString(),
  };

  const updatedEvent = await event.edit(Number(id), eventWithDatesFormated);
  return res.status(StatusCodes.OK).json({
    event: updatedEvent,
    success: 1,
    message: 'Evento editado com sucesso!',
  });
}
module.exports = {
  listAll,
  listById,
  listByStartEndDate,
  listByText,
  changeStatus,
  deleteEvent,
  listByDate,
  create,
};
