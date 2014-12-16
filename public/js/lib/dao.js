var request = require("superagent");
var Path = require("path");

var requestMethods = ["get", "post", "put", "delete"];

function DAO(){}

requestMethods.forEach(function(method){

  DAO.prototype[method] = function(path, data){
    var reqPath = Path.join(this.sectionPath, this.basePath, path);
    var req = request[method](reqPath);
    if (data){
      req.send(data);
    }

    this.addAuth(req, function(req){
      req.end(function(err, res){
        switch(req.body.status){
          case "success":
            // return data
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