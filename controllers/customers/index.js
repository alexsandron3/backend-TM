const { StatusCodes } = require('http-status-codes');

const { customer } = require('../../models/');

const moment = require('moment');

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
  const { ocultarInativos } = req.query;
  try {
    const customers = await customer.listByText(wordToSearch, ocultarInativos);
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
  } = req.customerData;
  try {
    const customers = await customer.create({
      nomeCliente,
      emailCliente,
      rgCliente,
      orgaoEmissor,
      cpfCliente,
      telefoneCliente,
      dataNascimento: moment(dataNascimento, 'DD/MM/YYYY').toISOString(),
      idadeCliente,
      referencia,
      pessoaContato,
      telefoneContato,
      cpfConsultado,
      dataCpfConsultado:
        dataCpfConsultado === ''
          ? null
          : moment(dataCpfConsultado, 'DD/MM/YYYY').toISOString(),
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

async function changeStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.query;
  try {
    const customers = await customer.changeStatus(
      Number(id),
      JSON.parse(status),
    );
    const message = JSON.parse(status)
      ? 'Cliente ativado com sucesso!'
      : 'Cliente desativado com sucesso!';
    return res.status(StatusCodes.OK).json({
      success: 1,
      message,
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
  changeStatus,
};
