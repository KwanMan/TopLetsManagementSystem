var router = require('express').Router();
var controller = require("../controllers/property");

router.get('/', controller.getProperties);

router.post('/', controller.createProperty);

router.get('/:id', controller.getPropertyById);

router.delete('/:id', controller.deletePropertyById);

// Get unassigned rent payments
router.get('/:id/rent-payment/new', controller.getNewRentPayments);

// Get unsassigned receipts
router.get('/:id/receipt/new', controller.getNewReceipts);

router.post('/:id/receipt', controller.createReceipt);

router.post('/:id/report', controller.createReport);

router.get('/:id/report/:year/:month', controller.getReportByDate);

router.post('/:id/contract', controller.createContract);

module.exports = {
  mountPath: "/property",
  routes: router,
  protected: true
};