const express = require('express');
const router = express.Router();
const { reports } = require('../controllers');

router.get('/pending-payments', reports.listPendingPayments);
router.get('/top-pending/customers', reports.listTopPendingCustomers);
router.get('/top-pending/events', reports.listTopPendingEvents);
router.get('/top-payments/customers', reports.listTopCustomers);
router.get('/not-pending-payments', reports.listPaymentsNotPending);

module.exports = router;
