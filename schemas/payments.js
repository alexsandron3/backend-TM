const Joi = require('joi');

const paymentSchema = Joi.object({
  idPasseio: Joi.number().required(),
  idCliente: Joi.number().required(),
  valorPago: Joi.number().required().default(0),
  valorVendido: Joi.number().required().default(0),
  previsaoPagamento: Joi.string.optional(),
  valorPendente: Joi.number.required().default(0),
  seguroViagem: Joi.boolean().required().default(false),
  clienteParceiro: Joi.boolean().required().default(false),
  transporte: Joi.string().optional(),
  anotacoes: Joi.string().optional(),
  historicoPagamento: Joi.string().optional(),
  valorSeguroViagemCliente: Joi.number().required().default(0),
  taxaPagamento: Joi.number().required().default(0),
  localEmbarque: Joi.string().required(),
  dataPagamento: Joi.string().required(),
  clienteDesistente: Joi.boolean().required().default(false),
  ordemPoltrona: [Joi.number().optional(), Joi.allow(null)],
  valorContrato: Joi.number().required().default(0),
  numeroVagas: Joi.number().required().default(1),
  opcionais: Joi.string().optional(),
});
module.exports = paymentSchema;
