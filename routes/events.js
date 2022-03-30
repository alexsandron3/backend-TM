const express = require('express');
const { events } = require('../controllers');
const router = express.Router();

// Listar todos passeios
router.get('/', events.listAll);

// Listar um passeio específico
router.get('/:id', events.listById);

module.exports = router;
