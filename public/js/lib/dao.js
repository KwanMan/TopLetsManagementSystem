var request = require("superagent");
var Path = require("path");
var when = require("when");
var auth = require("./auth");
var config = require("lib/config");
var _ = require("lodash");

var requestMethods = ["get", "post", "put", "del"];

function DAO(){}

requestMethods.forEach(function(method){

  DAO.prototype[method] = function(path, data, attachments){
    var self = this;

    return when.promise(function(resolve, reject) {

      if (!auth.loggedIn()) {
        console.log("Not logged in");
        reject({
          status: 401,
          message: "Unauthorised"
        });
      }

      var reqPath = config.apiPath + self.basePath + path;

      var req = request[method](reqPath);
      
      if (attachments) {
        attachments.forEach(function(attachment) {
          req.attach(attachment.field, attachment.file, attachment.file.name);
        });

        if (data) {
          _.pairs(data).forEach(function(row) {
            req.field(row[0], row[1]);
          });
        }
      } else {
        if (data) {
          req.send(data);
        }
      }

      req.auth(auth.getUsername(), auth.getToken());

      req.end(function(err, res) {
          switch(res.status){
            case 200:
              // return data
              resolve(res.body);
              break;
            default:
            reject({
              status: res.status,
              message: res.body.message
            });
          }
        });
      });
    
  };

});


module.exports = DAO;