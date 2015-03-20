var router = require('express').Router();
var controller = require("../controllers/property-report");



// Get all
router.get('/by-date/:year/:month', controller.getByDate);

router.get('/:id', controller.getReport);

module.exports = {
  mountPath: "/property-report",
  routes: router,
  protected: true
};