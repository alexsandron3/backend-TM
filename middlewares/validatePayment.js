const { payment, event } = require('../models/');
const { newPaymentSchema } = require('../schemas/payments');
const calculatePaymentStatus = require('../utils/calculatePaymentStatus');
const { PROBLEM_CODE, CLIENTE_INTERESSADO } = require('../utils/constants');
const countPaymentStatus = require('../utils/countPaymentStatus');
const prisma = require('../utils/prismaClient');

module.exports = async (req, res, next) => {
  let dataPagamento = null;
  try {
    const validateBody = await newPaymentSchema.validateAsync(req.body);
    const {
      idPasseio,
      idCliente,
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
    const paymentExists = await payment.listByCustomerIdAndEventId(
      Number(idCliente),
      Number(idPasseio),
    );
    if (paymentExists) {
      return res.status(400).json({
        success: 2,
        message: 'Este cliente já realizou um pagamento para este passeio!',
        payments: paymentExists,
      });
    }
    const { pagamento_passeio } = await payment.listByEventId(idPasseio);
    const { quitado, confirmado, parceiro, crianca } =
      countPaymentStatus(pagamento_passeio);

    const ocupiedSlots = quitado + confirmado + crianca;
    const paymentEvent = (await event.listById(idPasseio))[0];
    const totalSlots = paymentEvent.lotacao;
    const idadeIsencao = paymentEvent.idadeIsencao;
    const leftSlots = totalSlots - ocupiedSlots;
    if (leftSlots <= 0) {
      return res.status(400).json({
        success: 2,
        message: 'Limite de vagas atingido!',
      });
    }
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
    const newPaymentData = {
      idCliente: idCliente,
      idPasseio: idPasseio,
      createdBy: req.user.id,
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
        statusPayment !== CLIENTE_INTERESSADO ? new Date() : null,
      clienteDesistente,
      ordemPoltrona,
      valorContrato,
      numeroVagas,
      opcionais,
    };
    req.paymentData = newPaymentData;
    return next();
  } catch (error) {
    next(error);
  }
};
