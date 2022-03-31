const { StatusCodes } = require('http-status-codes');

const { customer } = require('../../models/');

async function listAll(req, res, next) {
  const { ocultarInativos } = req.query;
  try {
    const customers = await customer.listAll(ocultarInativos);
    return res.status(StatusCodes.OK).json({
      customers,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}

async function listByText(req, res, next) {
  const { wordToSearch } = req.params;
  try {
    const customers = await customer.listByText(wordToSearch);
    return res.status(StatusCodes.OK).json({
      customers,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}
async function listById(req, res, next) {
  const { id } = req.params;
  try {
    const customers = await customer.listById(id);
    return res.status(StatusCodes.OK).json({
      customers,
      success: 1,
      message: 'Pesquisa realizada com sucesso!',
    });
  } catch (error) {
    next(error);
  }
}
async function create(req, res, next) {
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
  try {
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
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listAll,
  listByText,
  listById,
  create,
};
