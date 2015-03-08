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
    return;
  }

  admin.verifyPassword(user.pass, function (err, isMatch){
    if (err){
      console.log(err);
      res.status(401).end();
      return;
    }

    if (!isMatch){
      console.log("wrong password");
      res.status(401).end();
      return;
    }

    console.log("authenticated");
    next();

  });
});

}; 