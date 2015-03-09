var router = require("express").Router();
var fs = require('fs');
var path = require('path');
var checkAccessToken = require("../middleware/checkAccessToken");

fs.readdirSync(__dirname).filter(function (file){
  return file !== "index.js";
}).forEach (function (file){
  var routes = require(path.join(__dirname, file));
  if (routes.protected) {
    router.use(routes.mountPath, checkAccessToken, routes.routes);
  } else {
    router.use(routes.mountPath, routes.routes);    
  }
});

module.exports = router;
