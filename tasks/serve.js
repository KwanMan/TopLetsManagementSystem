var express     = require("express");
var liveReload  = require("connect-livereload");
var path        = require("path");
var serveStatic = require("serve-static");

module.exports = function (grunt) {

  grunt.registerTask("serve", function () {
    this.async();
    var server = express();

    server.use(liveReload({ port: grunt.config("serve.livereload") }));
    server.use(express.static("public/build"));
    server.use("/", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../public/build/index.html"));
    });
    server.listen(grunt.config("serve.port"));
    grunt.log.writeln("Application running on port " + grunt.config("serve.port"));
  });

};