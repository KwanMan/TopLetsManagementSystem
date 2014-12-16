var dateUtils = require('../utils/date');
var models = require('../models');

module.exports = function (req, res, next) {

  // Find correct user
  models.Admin.find({
    where: {
      username: req.headers.authuser
    }
  }).success(function (admin){
    if (!admin){
      res.sendStatus(401);
    }
    // Find matching token
    models.AccessToken.find({
      where: {
        token: req.headers.authorization
      }
    }).success(function (token){
      if (!token){
        res.sendStatus(401);
      }

      // Check it is still valid
      if (!token.expired()){
        next();
      } else {
        console.log("Access token " + token.token + " exired");
        res.sendStatus(401);
      }
    });
  });
}; 