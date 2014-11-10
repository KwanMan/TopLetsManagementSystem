var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var models = require('../models');

passport.use(new BasicStrategy(
  function (username, password, callback){
    models.User.find({
      where: {
        username: username
      }
    }).success(function (user){
      if (!user){ return callback(null, false); }

      user.verifyPassword(password, function (err, isMatch){
        if (err){ return callback(err); }

        if (!isMatch) { return callback(null, false); }

        return callback(null, user);
      });
    });
  })
);

exports.isAuthenticated = passport.authenticate('basic', {session: false});