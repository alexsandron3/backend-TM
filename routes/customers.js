const express = require('express');
const router = express.Router();
const { customers } = require('../controllers');

// Listar todos clientes
router.get('/', customers.listAll);

// Listar clientes por texto
router.get('/:wordToSearch', customers.listByText);

// Listar clientes por id
router.get('/id/:id', customers.listById);

// Criar cliente
router.post('/', customers.create);

// Exportar rotas
module.exports = router;
