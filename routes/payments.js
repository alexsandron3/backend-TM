const express = require('express');
const router = express.Router();
const { payments } = require('../controllers');

// Listar um pagamento pelo id do cliente e id do passeio
router.get(
  '/cliente/:idCliente/passeio/:idPasseio',
  payments.listByCustomerIdAndEventId,
);

//Listar pagamentos e passeios baseado em uma data inicial e uma data final
router.get('/data/:dataInicial/:dataFinal', payments.listByEventStartEndDate);

// Listar varios pagamentos baseado no id e datas inicial e final do passeio
router.get('/events/', payments.listByEventStartEndDate);

//Listar um pagamento pelo id do pagamento
router.get('/id/:id', payments.listById);

// Listar todos pagamentos
router.get('/', payments.listAll);

module.exports = router;
