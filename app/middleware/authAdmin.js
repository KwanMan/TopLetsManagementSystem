var models = require('../models');
var auth = require('basic-auth');

module.exports = function (req, res, next) {

var user = auth(req);

if (!user){
  res.status(401).end();
}

models.Admin.findOne({
  where: {
    username: user.name
  }
}).success(function (admin){
  if (!admin){
    console.log("user not found");
    res.status(401).end();
  }

  admin.verifyPassword(user.pass, function (err, isMatch){
    if (err){
      console.log(err);
      res.status(401).end();
    }

    if (!isMatch){
      console.log("wrong password");
      res.status(401).end();
    }

    console.log("authenticated");

    next();

  });
});

}; 