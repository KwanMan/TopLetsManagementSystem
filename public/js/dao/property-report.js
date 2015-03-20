var inherits = require("inherits");

inherits(PropertyReportDAO, require("lib/dao"));

function PropertyReportDAO(){}

PropertyReportDAO.prototype.basePath = "/property-report";

PropertyReportDAO.prototype.getByDate = function(year, month) {
  return this.get("/by-date/" + year + "/" + month);
};

PropertyReportDAO.prototype.getReport = function(id) {
  return this.get("/" + id);
};

module.exports = new PropertyReportDAO();