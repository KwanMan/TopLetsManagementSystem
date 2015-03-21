var auth = require("basic-auth");
var dateUtils = require('../utils/date');
var models = require('../models');

module.exports = function (req, res, next) {

  var user = auth(req);

  // Find correct user
  models.Admin.findOne({
    where: {
      username: user.name
    }
  }).success(function (admin){
    if (!admin){
      console.log('user not found');
      res.status(401).end();
      return;
    }
    // Find matching token
    models.AccessToken.find({
      where: {
        token: user.pass
      }
    }).success(function (token){
      if (!token){
        console.log('no token found');
        res.status(401).end();
        return;
      }

      // Check it is still valid
      if (token.expired()){
        console.log("Access token " + token.token + " expired");
        res.status(401).end();
        return;
      }

      next();
    });
  });
}; 