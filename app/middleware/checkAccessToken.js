var dateUtils = require('../utils/date');
var models = require('../models');

module.exports = function (req, res, next) {

 /* next();

  return;*/

  // Find correct user
  models.Admin.findOne({
    where: {
      username: req.headers.authuser
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
        token: req.headers.authorization
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