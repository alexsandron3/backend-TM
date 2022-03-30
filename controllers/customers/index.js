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

module.exports = {
  listAll,
  listByText,
  listById,
};
