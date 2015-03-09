var router = require('express').Router();
var controller = require("../controllers/property");

router.route('/')

  .get(controller.getProperties)

  .post(controller.createProperty);

router.route('/:id')

  .get(controller.getPropertyById)

  .delete(controller.deletePropertyById);

module.exports = {
  mountPath: "/property",
  routes: router,
  protected: true
};