const { StatusCodes } = require('http-status-codes');

const { payment } = require('../../models/');

async function listPendingPayments(req, res) {
  const payments = await payment.listPendingPayments();
  return res.status(StatusCodes.OK).json({
    payments,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

module.exports = {
  listPendingPayments,
};
