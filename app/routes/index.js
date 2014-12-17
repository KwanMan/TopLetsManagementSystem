var router = require("express").Router();

var landlordRoutes = require("./landlords");
var propertyRoutes = require("./properties");
var authenticateRoutes = require("./authenticate");
var contractRoutes = require("./contract");

router.use("/landlord", landlordRoutes);
router.use("/property", propertyRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/contract", contractRoutes);

module.exports = router;
