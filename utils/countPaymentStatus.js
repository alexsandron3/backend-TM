const {
  CLIENTE_INTERESSADO,
  PAGAMENTO_QUITADO,
  CLIENTE_CONFIRMADO,
  CLIENTE_PARCEIRO,
  CLIENTE_CRIANÇA,
} = require('./constants');

module.exports = (payments) => {
  const paymentStatus = {
    interessado: 0,
    quitado: 0,
    confirmado: 0,
    parceiro: 0,
    crianca: 0,
  };
  payments.forEach((payment) => {
    if (payment.statusPagamento === CLIENTE_INTERESSADO) {
      paymentStatus.interessado += 1;
    } else if (payment.statusPagamento === PAGAMENTO_QUITADO) {
      paymentStatus.quitado += 1;
    } else if (payment.statusPagamento === CLIENTE_CONFIRMADO) {
      paymentStatus.confirmado += 1;
    } else if (payment.statusPagamento === CLIENTE_PARCEIRO) {
      paymentStatus.parceiro += 1;
    } else if (payment.statusPagamento === CLIENTE_CRIANÇA) {
      paymentStatus.crianca += 1;
    }
  });
  return paymentStatus;
};
