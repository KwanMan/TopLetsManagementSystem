var router = require("express").Router();
var fs = require('fs');
var path = require('path');

fs.readdirSync(__dirname).filter(function (file){
  return file !== "index.js";
}).forEach (function (file){
  var routes = require(path.join(__dirname, file));
  router.use(routes.mountPath, routes.routes);
});

/*require('require-all')({
  dirname: __dirname,

})

var landlordRoutes = require("./landlords");
var propertyRoutes = require("./properties");
var authenticateRoutes = require("./authenticate");
var contractRoutes = require("./contract");

router.use("/landlord", landlordRoutes);
router.use("/property", propertyRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/contract", contractRoutes);*/

module.exports = router;
