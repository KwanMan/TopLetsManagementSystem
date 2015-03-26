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

PropertyDAO.prototype.deleteProperty = function(id) {
  return this.del("/" + id);
};

PropertyDAO.prototype.updateProperty = function(id, data) {
  return this.put("/" + id, data);
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

PropertyDAO.prototype.getContractInYear = function(id, year) {
  return this.get("/" + id + "/contract/" + year);
};

PropertyDAO.prototype.createReceipt = function(id, data, attachments) {
  return this.post("/" + id + "/receipt", data, attachments);
};

PropertyDAO.prototype.getReportByDate = function(id, year, month) {
  return this.get("/" + id + "/report/" + year + "/" + month);
};

PropertyDAO.prototype.getReports = function(id) {
  return this.get("/" + id + "/report");
};

module.exports = new PropertyDAO();