const express = require('express');
const { events } = require('../controllers');
const router = express.Router();

// Listar eventos por data de inicio e fim
router.get('/start-end-date', events.listByStartEndDate);

//Listar eventos por texto
router.get('/text/:wordToSearch', events.listByText); 

// Listar um evento  específico
router.get('/id/:id', events.listById);

// Listar todos eventos
router.get('/', events.listAll);


module.exports = router;
