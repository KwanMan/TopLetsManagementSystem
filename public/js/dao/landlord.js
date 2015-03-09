var inherits = require("inherits");

inherits(LandlordDAO, require("lib/dao"));

function LandlordDAO(){}

LandlordDAO.prototype.basePath = "/landlord";

LandlordDAO.prototype.getLandlords = function(){
  return this.get("/");
};

LandlordDAO.prototype.getProperties = function(id){
  return this.get("/" + id + "/properties");
};

LandlordDAO.prototype.createLandlord = function(data){
  return this.post("/", data);
};

module.exports = new LandlordDAO();