const { StatusCodes } = require('http-status-codes');

const { payment } = require('../../models/');

const moment = require('moment');
async function listPendingPayments(req, res) {
  const payments = await payment.listPendingPayments();

  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listTopPendingCustomers(req, res) {
  const allPayments = await payment.listTopPendingCustomers();
  const paymentsByUsers = allPayments.reduce((acc, pagamento) => {
    const { cliente } = pagamento;
    if (acc[cliente.nomeCliente]) {
      acc[cliente.nomeCliente] += 1;
    } else {
      acc[cliente.nomeCliente] = 1;
    }
    return acc;
  }, {});
  const sortedPaymentsByUsers = Object.entries(paymentsByUsers).sort(
    (a, b) => b[1] - a[1],
  );
  return res.status(StatusCodes.OK).json({
    payments: Object.fromEntries(sortedPaymentsByUsers),
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listTopPendingEvents(req, res) {
  const allPayments = await payment.listTopPendingEvents();
  const paymentsByEvent = allPayments.reduce((acc, pagamento) => {
    const { passeio } = pagamento;
    if (
      acc[
        `${passeio.nomePasseio} | ${moment(passeio.dataPasseio)
          .add(1, 'days')
          .format('DD/MM/yyyy')}`
      ]
    ) {
      acc[
        `${passeio.nomePasseio} | ${moment(passeio.dataPasseio)
          .add(1, 'days')
          .format('DD/MM/yyyy')}`
      ] += 1;
    } else {
      acc[
        `${passeio.nomePasseio} | ${moment(passeio.dataPasseio)
          .add(1, 'days')
          .format('DD/MM/yyyy')}`
      ] = 1;
    }
    return acc;
  }, {});
  const sortedPaymentsByEvent = Object.entries(paymentsByEvent).sort(
    (a, b) => b[1] - a[1],
  );
  return res.status(StatusCodes.OK).json({
    payments: Object.fromEntries(sortedPaymentsByEvent),
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listTopCustomers(req, res) {
  const allPayments = await payment.listTopCustomers();
  const paymentsByUsers = allPayments.reduce((acc, pagamento) => {
    const { cliente } = pagamento;
    if (acc[cliente.nomeCliente]) {
      acc[cliente.nomeCliente] += 1;
    } else {
      acc[cliente.nomeCliente] = 1;
    }
    return acc;
  }, {});
  const sortedPaymentsByUsers = Object.entries(paymentsByUsers).sort(
    (a, b) => b[1] - a[1],
  );
  return res.status(StatusCodes.OK).json({
    payments: Object.fromEntries(sortedPaymentsByUsers),
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listPaymentsNotPending(req, res) {
  const allPayments = await payment.listPaymentsNotPending();
  return res.status(StatusCodes.OK).json({
    payments: allPayments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listPaymentsByDate(req, res) {
  const { startDate, endDate } = req.query;
  const allPayments = await payment.listPaymentsByDate(startDate, endDate);
  return res.status(StatusCodes.OK).json({
    payments: allPayments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listTopSellersByDate(req, res) {
  const { startDate, endDate } = req.query;
  const allPayments = await payment.listTopSellersByDate(startDate, endDate);
  const paymentsByUsers = allPayments.reduce((acc, pagamento) => {
    const { users } = pagamento;
    if (acc[users.username]) {
      acc[users.username] += 1;
    } else {
      acc[users.username] = 1;
    }
    return acc;
  }, {});
  const sortedPaymentsByUsers = Object.entries(paymentsByUsers).sort(
    (a, b) => b[1] - a[1],
  );
  return res.status(StatusCodes.OK).json({
    payments: Object.fromEntries(sortedPaymentsByUsers),
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}
module.exports = {
  listPendingPayments,
  listTopPendingCustomers,
  listTopPendingEvents,
  listTopCustomers,
  listPaymentsNotPending,
  listPaymentsByDate,
  listTopSellersByDate,
};
