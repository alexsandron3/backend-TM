const express = require('express');
const router = express.Router();
const { payments } = require('../controllers');

router.get(
  '/cliente/:idCliente/passeio/:idPasseio',
  payments.listByCustomerIdAndEventId,
);
router.get('/events/', payments.listByEventStartEndDate);

router.get('/passeio/:idPasseio', payments.listByEventId);

router.get('/data/:dataInicial/:dataFinal', payments.listByEventStartEndDate);

router.get('/start-end-date', payments.listPaymentsByDate);

router.get('/id/:id', payments.listById);

router.get('/', payments.listAll);

module.exports = router;
