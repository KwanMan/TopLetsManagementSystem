var inherits = require("inherits");

inherits(PropertyDAO, require("lib/dao"));

function PropertyDAO(){}

PropertyDAO.prototype.basePath = "/property";

PropertyDAO.prototype.getAllProperties = function() {
  return this.get("/");
};

PropertyDAO.prototype.getProperty = function(id) {
  return this.get("/" + id);
};

PropertyDAO.prototype.getNewRentPayments = function(id) {
  return this.get("/" + id + "/rent-payment/new");
};

PropertyDAO.prototype.getNewReceipts = function(id) {
  return this.get("/" + id + "/receipt/new");
};

PropertyDAO.prototype.createReport = function(id, data) {
  return this.post("/" + id + "/report", data);
};

PropertyDAO.prototype.createContract = function(id, data) {
  return this.post("/" + id + "/contract", data);
};

module.exports = new PropertyDAO();