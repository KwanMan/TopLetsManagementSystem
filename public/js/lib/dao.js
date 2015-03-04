var request = require("superagent");
var Path = require("path");
var when = require("when");

var requestMethods = ["get", "post", "put", "delete"];

function DAO(){}

requestMethods.forEach(function(method){

  DAO.prototype[method] = function(path, data){
    var self = this;

    return when.promise(function(resolve, reject) {
      var reqPath = "http://" + Path.join("localhost:8000/api", self.basePath, path);

      var req = request[method](reqPath);
      if (data){
        req.send(data);
      }

      req.end(function(err, res) {
          switch(res.status){
            case 200:
              // return data
              resolve(res.body);
              break;
            case "error":
            case "fail":
              // send err
              break;
            default:
          }
        });
      });
    
  };

});


module.exports = DAO;