const { StatusCodes } = require('http-status-codes');

const { customer } = require('../../models/');

async function listAll(req, res) {
  const { ocultarInativos } = req.query;
  const customers = await customer.listAll(ocultarInativos);
  return res.status(StatusCodes.OK).json({
    customers,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}

async function listByText(req, res) {
  const { wordToSearch } = req.params;
  const customers = await customer.listByText(wordToSearch);
  return res.status(StatusCodes.OK).json({
    customers,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}
async function listById(req, res) {
  const { id } = req.params;
  const customers = await customer.listById(id);
  return res.status(StatusCodes.OK).json({
    customers,
    success: 1,
    message: 'Pesquisa realizada com sucesso!',
  });
}
async function create(req, res) {
  const {
    nomeCliente,
    emailCliente,
    rgCliente,
    orgaoEmissor,
    cpfCliente,
    telefoneCliente,
    dataNascimento,
    idadeCliente,
    referencia,
    pessoaContato,
    telefoneContato,
    cpfConsultado,
    dataCpfConsultado,
    redeSocial,
    statusCliente,
    enderecoCliente,
    nacionalidade,
    profissao,
    estadoCivil,
    clienteRedeSocial,
    poltrona,
    statusCpf,
  } = req.body;
  const customers = await customer.create({
    nomeCliente,
    emailCliente,
    rgCliente,
    orgaoEmissor,
    cpfCliente,
    telefoneCliente,
    dataNascimento,
    idadeCliente,
    referencia,
    pessoaContato,
    telefoneContato,
    cpfConsultado,
    dataCpfConsultado,
    redeSocial,
    statusCliente,
    enderecoCliente,
    nacionalidade,
    profissao,
    estadoCivil,
    clienteRedeSocial,
    poltrona,
    statusCpf,
  });

  return res.status(StatusCodes.CREATED).json({
    customers,
    success: 1,
    message: 'Cliente criado com sucesso!',
  });
}

module.exports = {
  listAll,
  listByText,
  listById,
  create,
};
