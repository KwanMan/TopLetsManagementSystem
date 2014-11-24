var express     = require("express");
var liveReload  = require("connect-livereload");
var path        = require("path");

var mainServer = require("../server");

module.exports = function (grunt) {

  grunt.registerTask("serve", function () {
    this.async();

    var server = mainServer(grunt.config("serve.port"));

    server.use(liveReload({ port: grunt.config("serve.livereload") }));
  });

};