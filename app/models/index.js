var config    = require("config");
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var options = config.db;
options.define = {
  timestamps: true,
  paranoid: true,
  underscored: true
};

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, options);
var models    = {};

fs.readdirSync(__dirname).filter(function (file){
  return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function (file){
  var model = sequelize.import(path.join(__dirname, file));
  models[model.name] = model;
});

Object.keys(models).forEach(function (modelName){
  if ("associate" in models[modelName]){
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
