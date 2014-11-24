var router = require("express").Router();

var landlordRoutes = require("./landlords");
var propertyRoutes = require("./properties");

router.use("/landlord", landlordRoutes);
router.use("/property", propertyRoutes);

module.exports = router;
