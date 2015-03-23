var request = require("superagent");
var config = require("lib/config");

module.exports = {

  login: function(username, password, cb) {
    var reqPath = config.apiPath + "authenticate";

    request
      .post(reqPath)
      .auth(username, password)
      .send({lifetime: 60})
      .end(function(err, res) {

        console.log(res);

        if (res.status === 200) {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('token', res.body.accessToken);
          cb(true);
          return;
        } else {
          cb(false);
          return;
        }
    });
  },

  getUsername: function() {
    return sessionStorage.getItem('username');
  },

  getToken: function() {
    return sessionStorage.getItem('token');
  },

  logout: function(cb) {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

  },

  loggedIn: function() {
    var username = sessionStorage.getItem('username');
    var token = sessionStorage.getItem('token');
    
    return username !== null && token !== null;
  },

  getAssetUrl: function(filename, download) {
    var path = config.apiPath + "asset/" + filename + "?token=" + this.getToken();

    if (download) {
      path = path + "&download=true";
    }

    return path;

  }

};