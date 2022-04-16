const { messages } = require('joi-translation-pt-br');
const { payment, event } = require('../models/');
const { editPaymentSchema } = require('../schemas/payments');
const calculatePaymentStatus = require('../utils/calculatePaymentStatus');
const { PROBLEM_CODE, CLIENTE_INTERESSADO } = require('../utils/constants');

module.exports = async (req, res, next) => {
  let dataPagamento = null;
  try {
    const validateBody = await editPaymentSchema.validateAsync(req.body, {
      messages,
    });
    const {
      idPagamento,
      valorPago,
      valorVendido,
      previsaoPagamento,
      valorPendente,
      seguroViagem,
      clienteParceiro,
      transporte,
      anotacoes,
      historicoPagamento,
      taxaPagamento,
      localEmbarque,
      clienteDesistente,
      ordemPoltrona,
      valorContrato,
      numeroVagas,
      opcionais,
      idadeCliente,
      valorSeguroViagemCliente,
    } = validateBody;
    const paymentExists = await payment.listById(idPagamento);
    if (!paymentExists) {
      return res.status(400).json({
        success: 2,
        message:
          'Houve um problema ao processar o pagamento, tente novamente ou entre em contato com o suporte!',
      });
    }

    const paymentEvent = (await event.listById(paymentExists.idPasseio))[0];
    const idadeIsencao = paymentEvent.idadeIsencao;
    const statusPayment = calculatePaymentStatus(
      valorPendente,
      valorPago,
      idadeCliente,
      idadeIsencao,
      clienteParceiro,
    );
    if (statusPayment === PROBLEM_CODE) {
      return res.status(400).json({
        success: 0,
        message: 'Erro interno ao calcular status do pagamento!',
      });
    }
    const editPaymentData = {
      valorPago,
      valorVendido,
      previsaoPagamento,
      valorPendente,
      statusPagamento: statusPayment,
      clienteParceiro,
      transporte,
      anotacoes,
      historicoPagamento,
      valorSeguroViagemCliente,
      seguroViagem,
      taxaPagamento,
      localEmbarque,
      dataPagamento,
      dataPagamentoEfetuado:
        statusPayment !== CLIENTE_INTERESSADO &&
        paymentExists.dataPagamentoEfetuado === null
          ? new Date()
          : null,
      clienteDesistente,
      ordemPoltrona,
      valorContrato,
      numeroVagas,
      opcionais,
    };
    req.editPaymentData = {
      editPaymentData,
      paymentId: paymentExists.idPagamento,
    };
    return next();
  } catch (error) {
    next(error);
  }
};
