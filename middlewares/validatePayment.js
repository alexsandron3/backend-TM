const { payment, event } = require('../models/');
const paymentSchema = require('../schemas/payments');
const calculatePaymentStatus = require('../utils/calculatePaymentStatus');
const { PROBLEM_CODE } = require('../utils/constants');
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
    valorSeguroViagemCliente,
    taxaPagamento,
    localEmbarque,
    dataPagamento,
    clienteDesistente,
    ordemPoltrona,
    valorContrato,
    numeroVagas,
    opcionais,
    idadeCliente,
  } = req.body;
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
    console.log(statusPayment);
    return next();
  } catch (error) {
    next(error);
  }
};
