var models = require('../models');
var router = require('express').Router();
var dateUtils = require('../utils/date');
var uuid = require('uuid');
var auth = require('basic-auth');
var authAdmin = require('../middleware/authAdmin');

// Authenticates the user and gives it an access token
router.post('/', authAdmin, function (req, res){

  var generatedToken = uuid.v4();

  if (!req.body.lifetime) {
    res.status(400).end();
    return;
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