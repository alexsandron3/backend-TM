const express = require('express');
const router = express.Router();
const { customers } = require('../controllers');
const validateCustomer = require('../middlewares/validateCustomer');

// Listar clientes por texto
router.get('/text/:wordToSearch', customers.listByText);

// Listar clientes por id
router.get('/id/:id', customers.listById);

// Listar todos clientes
router.get('/', customers.listAll);

// Criar cliente
router.post('/', validateCustomer, customers.create);

// Exportar rotas
module.exports = router;
