var router = require("express").Router();

var landlordRoutes = require("./landlords");
var propertyRoutes = require("./properties");
var authenticateRoutes = require("./authenticate");

router.use("/landlord", landlordRoutes);
router.use("/property", propertyRoutes);
router.use("/authenticate", authenticateRoutes);

module.exports = router;
