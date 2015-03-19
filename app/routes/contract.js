var router = require('express').Router();

var controller = require("../controllers/contract");

// Gets contract by id
router.get('/:id', controller.getContractById);

// Gets unpaid rent payments
router.get('/:id/unpaid', controller.getUnpaidPayments);

// Gets tenants associated with contract
router.get('/:id/tenants', controller.getTenants);

router.post('/:id/payments', controller.createPayments);

module.exports = {
  mountPath: "/contract",
  routes: router,
  protected: true
};