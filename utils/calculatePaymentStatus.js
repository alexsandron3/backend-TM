const { payment } = require('../models/');
const {
  CLIENTE_INTERESSADO,
  PAGAMENTO_QUITADO,
  CLIENTE_CONFIRMADO,
  CLIENTE_PARCEIRO,
  CLIENTE_CRIANÇA,
  PROBLEM_CODE,
} = require('./constants');
module.exports = (
  valorPendente,
  valorPago,
  idadeCliente,
  idadeIsencao,
  clienteParceiro,
) => {
  if (idadeCliente <= idadeIsencao) return CLIENTE_CRIANÇA;
  if (clienteParceiro) return CLIENTE_PARCEIRO;
  if (valorPendente <= 0 && valorPago === 0 && clienteParceiro === 0)
    return CLIENTE_INTERESSADO;
  if (valorPendente === 0 && valorPago > 0) return PAGAMENTO_QUITADO;
  if (valorPendente < 0 && valorPago > 0) return CLIENTE_CONFIRMADO;
  return PROBLEM_CODE;
};
