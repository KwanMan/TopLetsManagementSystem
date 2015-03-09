var request = require("superagent");
var Path = require("path");
var when = require("when");
var auth = require("./auth");

var requestMethods = ["get", "post", "put", "delete"];

function DAO(){}

requestMethods.forEach(function(method){

  DAO.prototype[method] = function(path, data){
    var self = this;

    return when.promise(function(resolve, reject) {

      if (!auth.loggedIn()) {
        reject(new Error("Not logged in"));
      }

      var reqPath = "http://" + Path.join("localhost:8000/api", self.basePath, path);

      var req = request[method](reqPath);
      if (data){
        req.send(data);
      }

      req.set('authorization', auth.getToken());
      req.set('authuser', auth.getUsername());

      req.end(function(err, res) {
          switch(res.status){
            case 200:
              // return data
              resolve(res.body);
              break;
            case 401:
              reject(new Error("401 unauthorised"));
              break;
            default:
              console.log(res.status);
          }
        });
      });
    
  };

});


module.exports = DAO;