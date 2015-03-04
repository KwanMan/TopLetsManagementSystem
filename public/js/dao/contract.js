var inherits = require("inherits");

inherits(ContractDAO, require("../lib/dao-admin"));

function ContractDAO(){}

ContractDAO.prototype.basePath = "/contract";

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

module.exports = new ContractDAO();