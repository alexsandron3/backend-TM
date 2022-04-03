const express = require('express');
const router = express.Router();
const { reports } = require('../controllers');

router.get('/pending-payments', reports.listPendingPayments);

module.exports = router;
