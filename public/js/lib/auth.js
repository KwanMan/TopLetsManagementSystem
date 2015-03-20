var request = require("superagent");

module.exports = {

  login: function(username, password, cb) {
    var reqPath = "http://localhost:8000/api/authenticate";

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
  }

};