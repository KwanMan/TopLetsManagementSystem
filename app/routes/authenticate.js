var models = require('../models');
var router = require('express').Router();
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var dateUtils = require('../utils/date');
var uuid = require('uuid');

passport.use(new BasicStrategy(
  function (username, password, callback){
    models.Admin.find({
      where: {
        username: username
      }
    }).success(function (admin){
      if (!admin){
        return callback(null, false);
      }

      admin.verifyPassword(password, function (err, isMatch){
        if (err){
          return callback(err);
        }

        if (!isMatch){
          return callback(null, false);
        }

        return callback(null, admin);
      });
    });
  }
));

// Authenticates the user and gives it an access token
router.post('/', passport.authenticate('basic', {session: false}), function (req, res){

  console.log("authenticated");

  var generatedToken = uuid.v4();

  if (!req.body.lifetime) {
    res.sendStatus(400);
  }

  models.AccessToken.create({
    token: generatedToken,
    expiry: dateUtils.getTimeIn({minutes: req.body.lifetime})
  }).success(function (token){
    token.setAdmin(req.user);
    res.send({accessToken: token.token});
  });


});

module.exports = {
  mountPath: "/authenticate",
  routes: router
};