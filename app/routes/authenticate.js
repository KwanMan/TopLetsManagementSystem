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

router.route('/')

.post(passport.authenticate('basic', {session: false}), function (req, res){

  console.log("authenticated");

  var generatedToken = uuid.v4();

  models.AccessToken.create({
    token: generatedToken,
    expiry: dateUtils.getTimeIn({minutes: 10})
  }).success(function (token){
    token.setAdmin(req.user);
    res.send({accessToken: token.token});
  });


});

module.exports = router;