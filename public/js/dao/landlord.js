var inherits = require("inherits");

inherits(LandlordDAO, require("../lib/dao-admin"));

function LandlordDAO(){}

LandlordDAO.prototype.basePath = "/landlord";

LandlordDAO.prototype.getLandlords = function(){
  return this.get("/");
};

LandlordDAO.prototype.getProperties = function(id){
  return this.get("/" + id + "/properties");
};

module.exports = new LandlordDAO();