var router = require('express').Router();
var controller = require("../controllers/rent-payment");

// Set rent payment as paid
router.post('/:id/pay', controller.markPaymentPaid);

module.exports = {
  mountPath: "/rent-payment",
  routes: router,
  protected: true
};