const express = require('express');
const router = express.Router();
const { payments } = require('../controllers');

// Listar todos pagamentos
router.get('/', payments.listAll);

//Listar um pagamento pelo id do pagamento
router.get('/:id', payments.listById);

// Listar um pagamento pelo id do cliente e id do passeio
router.get(
  '/cliente/:idCliente/passeio/:idPasseio',
  payments.listByCustomerIdAndEventId,
);

//Listar pagamentos e passeios baseado em uma data inicial e uma data final
router.get('/data/:dataInicial/:dataFinal', payments.listByEventStartEndDate);

// Listar varios pagamentos baseado no id e datas inicial e final do passeio
router.get('/passeio/:idPasseio', payments.listByEventId);

module.exports = router;
