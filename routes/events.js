const express = require('express');
const { events } = require('../controllers');
const { validateNewEvent } = require('../middlewares');
const router = express.Router();

// Listar eventos por data de inicio e fim
router.get('/start-end-date', events.listByStartEndDate);

// Listar eventos por data
router.get('/date/:date', events.listByDate);

//Listar eventos por texto
router.get('/text/:wordToSearch', events.listByText);

// Alterar o status de um evento
router.put('/status/:id', events.changeStatus);

// Listar um evento  específico
router.get('/id/:id', events.listById);

// Deletar um evento específico
router.delete('/id/:id', events.deleteEvent);

// Novo evento
router.post('/', validateNewEvent, events.create);

// Listar todos eventos
router.get('/', events.listAll);

module.exports = router;
