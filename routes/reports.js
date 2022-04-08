const express = require('express');
const router = express.Router();
const { reports } = require('../controllers');

router.get('/pending-payments', reports.listPendingPayments);
router.get('/top-pending/customers', reports.listTopPendingCustomers);
router.get('/top-pending/events', reports.listTopPendingEvents);
router.get('/top-payments/customers', reports.listTopCustomers);
router.get('/top-payments/users', reports.listTopSellersByDate);
router.get('/not-pending-payments', reports.listPaymentsNotPending);
router.get(
  '/grouped/events/start-end-date',
  reports.listPaymentsGroupedByEventAndDate,
);

module.exports = router;
