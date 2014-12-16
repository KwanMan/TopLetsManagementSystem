var inherits = require("inherits");

var AdminDAO = require("../../lib/dao");

inherits(LandlordDAO, AdminDAO);

function LandlordDAO(){}

LandlordDAO.prototype.basePath = "/landlords";

LandlordDAO.prototype.getLandlords = function(){
  return this.get("/");
};



module.exports = new LandlordDAO();