var router = require('express').Router();

var controller = require("../controllers/contract");

router.post('/', controller.createContract);

// Gets contract by id
router.get('/:id', controller.getContractById);

// Gets unpaid rent payments
router.get('/:id/unpaid', controller.getUnpaidPayments);

// Gets tenants associated with contract
router.get('/:id/tenants', controller.getTenants);

// Gets all contracts for specified year
router.get('/year/:year', controller.getContractsByYear);

router.post('/:id/payments', controller.createPayments);

module.exports = {
  mountPath: "/contract",
  routes: router,
  protected: true
};