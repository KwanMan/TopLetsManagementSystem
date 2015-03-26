var inherits = require("inherits");

inherits(LandlordDAO, require("lib/dao"));

function LandlordDAO(){}

LandlordDAO.prototype.basePath = "/landlord";

LandlordDAO.prototype.getLandlords = function(){
  return this.get("/");
};

LandlordDAO.prototype.getLandlord = function(id) {
  return this.get("/" + id);
};

LandlordDAO.prototype.updateLandlord = function(id, data) {
  return this.put("/" + id, data);
};

LandlordDAO.prototype.deleteLandlord = function(id) {
  return this.del("/" + id);
};

LandlordDAO.prototype.getProperties = function(id){
  return this.get("/" + id + "/property");
};

LandlordDAO.prototype.createProperty = function(id, data) {
  return this.post("/" + id + "/property", data);
};

LandlordDAO.prototype.createLandlord = function(data){
  return this.post("/", data);
};

module.exports = new LandlordDAO();