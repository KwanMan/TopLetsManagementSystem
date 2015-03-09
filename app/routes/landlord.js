var router = require('express').Router();
var controller = require("../controllers/landlord");
router.route('/')

  // Get all
  .get(controller.getLandlords)

  // Create new
  .post(controller.createLandlord);

router.route('/:id')

  // Get by ID
  .get(controller.getLandlordById)

  // Delete by ID
  .delete(controller.deleteLandlordById);

router.route('/:id/properties')

  .get(controller.getProperties);

router.post('/:id/generateReports', controller.generateReports);

module.exports = {
  mountPath: "/landlord",
  routes: router,
  protected: true
};