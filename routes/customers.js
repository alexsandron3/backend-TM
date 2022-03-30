const express = require('express');
const router = express.Router();
const { customers } = require('../controllers');

// Listar todos clientes
router.get('/', customers.listAll);

router.get('/:wordToSearch', customers.listByText);
router.get('/id/:id', customers.listById);

module.exports = router;
