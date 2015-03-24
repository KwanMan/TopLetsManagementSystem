var router = require('express').Router();
var controller = require("../controllers/landlord");

// Get all
router.get('/', controller.getLandlords);

// Create new
router.post("/", controller.createLandlord);

// Get by ID
router.get("/:id", controller.getLandlordById);

// Delete by ID
router.delete("/:id", controller.deleteLandlordById);

// Get child properties
router.get('/:id/property', controller.getProperties);

// Create new property
router.post('/:id/property', controller.createProperty);

// Generate reports
router.post('/:id/generateReports', controller.generateReports);

module.exports = {
  mountPath: "/landlord",
  routes: router,
  protected: true
};