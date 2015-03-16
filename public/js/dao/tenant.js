var inherits = require("inherits");

inherits(TenantDAO, require("lib/dao"));

function TenantDAO(){}

TenantDAO.prototype.basePath = "/tenant";

TenantDAO.prototype.getAllTenants = function(){
  return this.get("/");
};

TenantDAO.prototype.getTenant = function(id){
  return this.get("/" + id);
};

TenantDAO.prototype.createTenant = function(data){
  return this.post("/", data);
};

TenantDAO.prototype.getRentPayments = function(id) {
  return this.get("/" + id + "/rent-payment");
};

module.exports = new TenantDAO();