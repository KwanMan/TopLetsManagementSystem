var inherits = require("inherits");

inherits(TenantDAO, require("../lib/dao"));

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

module.exports = new TenantDAO();