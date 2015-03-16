var router = require('express').Router();
var controller = require("../controllers/tenant");

router.get('/', controller.getTenants);

router.post('/', controller.createTenant);

router.get('/:id', controller.getTenantById);

router.delete('/:id', controller.deleteTenantById);

router.get('/:id/rent-payment', controller.getRentPayments);

module.exports = {
  mountPath: "/tenant",
  routes: router,
  protected: true
};