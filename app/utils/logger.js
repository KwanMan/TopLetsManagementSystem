var models = require("../models");

module.exports = {
  log: function(admin, action, result) {
    models.create({
      action: action,
      result: result
    }).then(function(log) {
      log.setAdmin(user);
    });
  }
};