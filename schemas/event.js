const Joi = require('joi');

const newEventSchema = Joi.object({
  nomePasseio: Joi.string().required(),
  localPasseio: [Joi.string().optional(), Joi.allow(null)],
  valorPasseio: Joi.number().optional().default(0),
  dataPasseio: Joi.string().required(),
  lotacao: Joi.number().required().min(5),
  anotacoes: [Joi.string().optional(), Joi.allow(null)],
  idadeIsencao: Joi.number().required(),
  statusPasseio: Joi.boolean().falsy(0).truthy(1).required().default(false),
  dataLancamento: [Joi.string().optional(), Joi.allow(null)],
  prazoVidencia: [Joi.string().optional(), Joi.allow(null)],
  itensPacote: [Joi.string().optional(), Joi.allow(null)],
  prazoVigencia: [Joi.string().optional(), Joi.allow(null)],
});

module.exports = {
  newEventSchema,
};
