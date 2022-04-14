const Joi = require('joi');

const paymentSchema = Joi.object({
  idCliente: Joi.number().required(),
  idPasseio: Joi.number().required(),
  valorPago: Joi.number().required().default(0),
  valorVendido: Joi.number().required().default(0),
  previsaoPagamento: [Joi.string().empty('').default(null), Joi.allow(null)],
  valorPendente: Joi.number().required().default(0),
  clienteParceiro: Joi.boolean().falsy(0).truthy(1).required().default(false),
  transporte: [Joi.string(), Joi.allow(null)],
  anotacoes: [Joi.string(), Joi.allow(null)],
  historicoPagamento: Joi.string(),
  seguroViagem: Joi.boolean().falsy(0).truthy(1).required().default(false),
  taxaPagamento: Joi.number().required().default(0),
  valorSeguroViagemCliente: Joi.number().default(0),
  localEmbarque: Joi.string().required(),
  dataPagamento: [Joi.string(), Joi.allow(null)],
  clienteDesistente: Joi.boolean().falsy(0).truthy(1).required().default(false),
  ordemPoltrona: [Joi.number(), Joi.allow(null)],
  valorContrato: Joi.number().required().default(0),
  numeroVagas: Joi.number().required().default(1),
  opcionais: Joi.string(),
  idadeCliente: Joi.number().required(),
});
module.exports = paymentSchema;
