const express = require('express');
const router = express.Router();
const { customers } = require('../controllers');
const validateNewCustomer = require('../middlewares/validateNewCustomer');

// Listar clientes por texto
router.get('/text/:wordToSearch', customers.listByText);

// Listar clientes por id
router.get('/id/:id', customers.listById);

// Listar todos clientes
router.get('/', customers.listAll);

// Criar cliente
router.post('/', validateNewCustomer, customers.create);

// Criar cliente
router.post('/', validateCustomer, customers.update);

// Desativar cliente
router.put('/status/:id', customers.changeStatus);

// Exportar rotas
module.exports = router;
