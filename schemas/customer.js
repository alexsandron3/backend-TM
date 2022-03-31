const Joi = require('joi');

const customerSchema = Joi.object({
  nomeCliente: Joi.string().required(),
  emailCliente: [Joi.string().email().optional(), Joi.allow(null)],
  rgCliente: [Joi.string().optional(), Joi.allow(null)],
  cpfCliente: [Joi.string().optional().min(14).max(14), Joi.allow(null)],
  telefoneCliente: [Joi.string().optional().min(10).max(11), Joi.allow(null)],
  dataNascimento: [Joi.string().optional().min(10).max(10), Joi.allow(null)],
  idadeCliente: [Joi.number().min(1).max(100).optional(), Joi.allow(null)],
  referencia: [Joi.string().optional(), Joi.allow(null)],
  pessoaContato: [Joi.string().optional(), Joi.allow(null)],
  telefoneContato: [Joi.string().optional().min(10).max(11), Joi.allow(null)],
  cpfConsultado: Joi.boolean().optional(),
  dataCpfConsultado: [Joi.string().optional().min(10).max(10), Joi.allow(null)],
  redeSocial: [Joi.string().optional(), Joi.allow(null)],
  statusCliente: Joi.boolean().optional(),
  enderecoCliente: [Joi.string().optional(), Joi.allow(null)],
  nacionalidade: [Joi.string().optional(), Joi.allow(null)],
  profissao: [Joi.string().optional(), Joi.allow(null)],
  estadoCivil: [Joi.string().optional(), Joi.allow(null)],
  clienteRedeSocial: Joi.boolean().required(),
  poltrona: [Joi.string().optional(), Joi.allow(null)],
  statusCpf: [Joi.string().optional(), Joi.allow(null)],
  orgaoEmissor: [Joi.string().optional(), Joi.allow(null)],
});

module.exports = customerSchema;
