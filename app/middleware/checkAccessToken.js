var auth = require("basic-auth");
var dateUtils = require('../utils/date');
var models = require('../models');

module.exports = function (req, res, next) {

  var user = auth(req);

  if (user === undefined) {
    user = {
      name: req.query.user,
      pass: req.query.token
    };
  }

  models.AccessToken.findOne({
    where: {
      token: user.pass
    }
  }).then(function(token) {
    if (!token) {
      console.log('Token not found');
      res.status(401).end();
      return;
    }

    if (token.expired()) {
      console.log("Token expired");
      res.status(401).end();
      return;
    }

    return token.getAdmin();
  }).then(function(admin) {
    if (admin) {
      console.log('authenticated');
      req.user = admin;
      next();
      return;
    }
    console.log("unauthenticated");
  });
}; 