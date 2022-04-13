const { payment, event } = require('../models/');
const paymentSchema = require('../schemas/payments');
const calculatePaymentStatus = require('../utils/calculatePaymentStatus');
const { PROBLEM_CODE, CLIENTE_INTERESSADO } = require('../utils/constants');
const countPaymentStatus = require('../utils/countPaymentStatus');
const prisma = require('../utils/prismaClient');

module.exports = async (req, res, next) => {
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
  } = req.body;
  let dataPagamento = null;
  try {
    await paymentSchema.validateAsync(req.body);
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

    const ocupiedSlots = quitado + confirmado + parceiro + crianca;
    const paymentEvent = (await event.listById(idPasseio))[0];
    const totalSlots = paymentEvent.lotacao;
    const idadeIsencao = paymentEvent.idadeIsencao;
    console.log(idadeCliente, idadeIsencao);
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
      idCliente,
      idPasseio,
      createdBy: req.user.username,
      valorPago,
      valorVendido,
      previsaoPagamento,
      valorPendente,
      statusPagamento: statusPayment,
      clienteParceiro,
      transporte,
      anotacoes,
      historicoPagamento,
      valorSeguroViagemCliente: seguroViagem,
      taxaPagamento,
      localEmbarque,
      dataPagamento,
      dataPagamentoEfetuado:
        statusPayment !== CLIENTE_INTERESSADO
          ? new Intl.DateTimeFormat('pt-BR').format(new Date())
          : null,
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
