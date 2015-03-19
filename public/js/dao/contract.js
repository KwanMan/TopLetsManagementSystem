var inherits = require("inherits");

inherits(ContractDAO, require("lib/dao"));

function ContractDAO(){}

ContractDAO.prototype.basePath = "/contract";

ContractDAO.prototype.getContract = function(id) {
  return this.get("/" + id);
};

ContractDAO.prototype.getAllInYear = function(year){
  return this.get("/year/" + year);
};

ContractDAO.prototype.getForPropertyInYear = function(year, property){
  return this.getAllInYear(year).then(function(contracts) {

    var matching = contracts.filter(function(contract) {
      return contract.property_id === property;
    });

    if (matching.length === 1) {
      return matching[0];
    } else {
      return null;
    }

  });
};

ContractDAO.prototype.createPayments = function(id, data) {
  return this.post("/" + id + "/payments", data);
};

module.exports = new ContractDAO();