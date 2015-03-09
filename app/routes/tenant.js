var router = require('express').Router();
var controller = require("../controllers/tenant");

router.route('/')

  .get(controller.getTenants)

  .post(controller.createTenant);

router.route('/:id')

  .get(controller.getTenantById)

  .delete(controller.deleteTenantById);

module.exports = {
  mountPath: "/tenant",
  routes: router,
  protected: true
};