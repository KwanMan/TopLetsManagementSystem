var router = require("express").Router();
var fs = require('fs');
var path = require('path');

fs.readdirSync(__dirname).filter(function (file){
  return file !== "index.js";
}).forEach (function (file){
  var routes = require(path.join(__dirname, file));
  router.use(routes.mountPath, routes.routes);
});

module.exports = router;
