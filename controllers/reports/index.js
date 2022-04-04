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
  const paymentsByClient = allPayments.reduce((acc, pagamento) => {
    const { cliente } = pagamento;
    if (acc[cliente.nomeCliente]) {
      acc[cliente.nomeCliente] += 1;
    } else {
      acc[cliente.nomeCliente] = 1;
    }
    return acc;
  }, {});
  const sortedPaymentsByClient = Object.entries(paymentsByClient).sort(
    (a, b) => b[1] - a[1],
  );
  return res.status(StatusCodes.OK).json({
    payments: Object.fromEntries(sortedPaymentsByClient),
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
  const paymentsByClient = allPayments.reduce((acc, pagamento) => {
    const { cliente } = pagamento;
    if (acc[cliente.nomeCliente]) {
      acc[cliente.nomeCliente] += 1;
    } else {
      acc[cliente.nomeCliente] = 1;
    }
    return acc;
  }, {});
  const sortedPaymentsByClient = Object.entries(paymentsByClient).sort(
    (a, b) => b[1] - a[1],
  );
  return res.status(StatusCodes.OK).json({
    payments: Object.fromEntries(sortedPaymentsByClient),
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}
module.exports = {
  listPendingPayments,
  listTopPendingCustomers,
  listTopPendingEvents,
  listTopCustomers,
};
