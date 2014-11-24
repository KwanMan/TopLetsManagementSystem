var express    = require("express");
var path       = require("path");
var config     = require("config");
var bodyParser = require("body-parser");
var passport   = require("passport");

var apiRoutes = require("./app/routes");

module.exports = function(port) {

  var server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(passport.initialise());

  server.use("/api", apiRoutes);

  server.use(express.static("public/build"));
  server.use("/", function(req, res) {
    res.sendFile(path.resolve(__dirname, "./public/build/index.html"));
  });

  server.listen(port || config.server.port);

  console.log("Listening on port " + port);

  return server;
};