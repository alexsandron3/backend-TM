const { StatusCodes } = require('http-status-codes');

const { payment, customer } = require('../../models/');

const moment = require('moment');
async function listPendingPayments(req, res, next) {
  try {
    const payments = await payment.listPendingPayments();

    return res.status(StatusCodes.OK).json({
      payments,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listTopPendingCustomers(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

async function listTopPendingEvents(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

async function listTopCustomers(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

async function listPaymentsNotPending(req, res, next) {
  try {
    const allPayments = await payment.listPaymentsNotPending();
    return res.status(StatusCodes.OK).json({
      payments: allPayments,
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

async function listTopSellersByDate(req, res, next) {
  const { startDate, endDate } = req.query;
  try {
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
  } catch (error) {
    next(error);
  }
}

async function listPaymentsGroupedByEventAndDate(req, res, next) {
  const { startDate, endDate } = req.query;
  try {
    const allPayments = await payment.listPaymentsGroupedByEventAndDate(
      startDate,
      endDate,
    );
    return res.status(StatusCodes.OK).json({
      payments: allPayments,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listCustomerFavorites(req, res, next) {
  const { customerId } = req.params;
  try {
    const favoriteEvents = await payment.listCustomerFavorites(
      parseInt(customerId),
    );
    const labels = favoriteEvents.map(({ nomePasseio }) => nomePasseio);
    // const series = allPayments.map(({ quantidade }) => Number(quantidade));
    console.log(labels);
    return res.status(StatusCodes.OK).json({
      payments: allPayments,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function financialReport(req, res, next) {
  const { startDate, endDate } = req.query;
  try {
    const financialPayment = await payment.financialPayments(
      startDate,
      endDate,
    );
    const outGoing = await payment.totalOutGoing(startDate, endDate);
    const averageSold = await payment.averageSold(startDate, endDate);
    const payments = await payment.listByEventStartEndDateAndStatus(
      startDate,
      endDate,
    );
    const newCustomers = await customer.newCustomers(startDate, endDate);
    return res.status(StatusCodes.OK).json({
      reports: {
        payments,
        values: {
          ...financialPayment[0],
          ...outGoing[0],
          ...averageSold[0],
          lucroReal:
            financialPayment[0].recebimentos - outGoing[0].totalDespesas,
          lucroEstimado:
            financialPayment[0].pendente +
            financialPayment[0].recebimentos -
            outGoing[0].totalDespesas,
          novosClientes: newCustomers.length,
        },
      },
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  listPendingPayments,
  listTopPendingCustomers,
  listTopPendingEvents,
  listTopCustomers,
  listPaymentsNotPending,
  listPaymentsByDate,
  listTopSellersByDate,
  listPaymentsGroupedByEventAndDate,
  financialReport,
  listCustomerFavorites,
};
