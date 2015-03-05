var inherits = require("inherits");

inherits(PropertyDAO, require("../lib/dao"));

function PropertyDAO(){}

PropertyDAO.prototype.basePath = "/property";

PropertyDAO.prototype.getAllProperties = function() {
  return this.get("/");
};

PropertyDAO.prototype.getProperty = function(id) {
  return this.get("/" + id);
};

module.exports = new PropertyDAO();