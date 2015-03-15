var inherits = require("inherits");

inherits(PropertyReportDAO, require("lib/dao"));

function PropertyReportDAO(){}

PropertyReportDAO.prototype.basePath = "/property-report";

PropertyReportDAO.prototype.getByDate = function(year, month) {
  return this.get("/by-date/" + year + "/" + month);
};

module.exports = new PropertyReportDAO();