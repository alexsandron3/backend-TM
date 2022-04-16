const { StatusCodes } = require('http-status-codes');

const { payment } = require('../../models/');
const countPaymentStatus = require('../../utils/countPaymentStatus');

async function listAll(req, res, next) {
  const { ocultarEncerrados } = req.query;
  try {
    const payments = await payments.listAll(ocultarEncerrados);
    return res.status(StatusCodes.OK).json({
      payments,
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
    const payments = await payment.listById(id);
    return res.status(StatusCodes.OK).json({
      payments,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listByCustomerIdAndEventId(req, res, next) {
  const { idCliente, idPasseio } = req.params;
  try {
    const payments = await payment.listByCustomerIdAndEventId(
      idCliente,
      idPasseio,
    );
    return res.status(StatusCodes.OK).json({
      payments,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listByEventStartEndDate(req, res, next) {
  const { dataInicial, dataFinal } = req.query;
  const { ocultarEncerrados } = req.query;
  try {
    const eventsWithPayments = await payment.listByEventStartEndDate(
      dataInicial,
      dataFinal,
      ocultarEncerrados,
    );

    const paymentsWithEventsAndStatus = eventsWithPayments.map((event) => {
      const paymentsTotalStatus = countPaymentStatus(event.pagamento_passeio);
      return {
        ...event,
        paymentsTotalStatus,
      };
    });
    return res.status(StatusCodes.OK).json({
      payments: paymentsWithEventsAndStatus,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listByEventId(req, res, next) {
  const { idPasseio } = req.params;
  try {
    const payments = await payment.listByEventId(idPasseio);
    const paymentsTotalStatus = countPaymentStatus(payments.pagamento_passeio);
    const paymentsWithStatus = {
      passeio: payments,
      paymentsTotalStatus,
    };

    return res.status(StatusCodes.OK).json({
      payments: {
        ...paymentsWithStatus,
      },
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listPaymentsByDate(req, res, next) {
  const { startDate, endDate } = req.query;
  try {
    const allPayments = await payment.listPaymentsByDate(startDate, endDate);
    return res.status(StatusCodes.OK).json({
      payments: allPayments,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const { paymentData } = req;
  try {
    const createdPayment = await payment.create(paymentData);
    return res.status(StatusCodes.OK).json({
      id: createdPayment.idPagamento,
      success: 1,
      message: 'Pagamento realizado com sucesso',
    });
  } catch (error) {
    next(error);
  }
}

async function edit(req, res, next) {
  const {
    editPaymentData: { editPaymentData, paymentId },
  } = req;
  console.log(req.editPaymentData);
  try {
    const editedPayment = await payment.edit(editPaymentData, paymentId);
    return res.status(StatusCodes.OK).json({
      payment: editedPayment,
      success: 1,
      message: 'Pagamento editado com sucesso',
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  listAll,
  listById,
  listByCustomerIdAndEventId,
  listByEventStartEndDate,
  listByEventId,
  listPaymentsByDate,
  create,
  edit,
};
