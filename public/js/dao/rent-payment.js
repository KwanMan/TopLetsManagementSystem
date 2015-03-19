var inherits = require("inherits");

inherits(RentPaymentDAO, require("lib/dao"));

function RentPaymentDAO(){}

RentPaymentDAO.prototype.basePath = "/rent-payment";

RentPaymentDAO.prototype.pay = function(id) {
  return this.post("/" + id + "/pay");
};

RentPaymentDAO.prototype.unpay = function(id) {
  return this.post("/" + id + "/unpay");
};

module.exports = new RentPaymentDAO();