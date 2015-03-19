var models = require('../models');
var when = require('when');
var moment = require("moment");

var Contract = models.Contract;
var Tenant = models.Tenant;
var RentPayment = models.RentPayment;
var Property = models.Property;

module.exports = {

  getContractById: function (req, res){
    Contract.findOne({
      where: {
        id:req.params.id
      },
      include: [Property, Tenant, RentPayment]
    }).then(function (contract){
      res.send(contract);
    });
  },

  getUnpaidPayments: function(req, res){
    Contract.findOne(req.params.id).then(function (contract){
      return contract.getUnpaidPayments();
    }).then(function (payments){
      res.send(payments);
    });
  },

  getTenants: function (req, res){
    Contract.findOne(req.params.id).then(function (contract){
      return contract.getTenants();
    }).then(function (tenants){
      res.send(tenants);
    });
  },

  createPayments: function(req, res) {

    Contract.findOne(req.params.id).then(function(contract) {

      var pw = contract.perWeek;
      var py = (pw * 52);

      var startDate = moment(new Date(contract.year, 5, 24, 12));

      return when.map(req.body.plans, function(plan) {

        var payments = [];
        var dueDate = startDate.clone();

        if (plan.plan === "monthly") {

          while(payments.length < 12) {
            payments.push({
              dueDate: dueDate.clone().toDate(),
              amount: py/12
            });
            dueDate.add(1, "M");
            
          }
        }

        if (plan.plan === "quarterly") {
          while(payments.length < 4) {
            payments.push({
              dueDate: dueDate.clone().toDate(),
              amount: py/4
            });
            dueDate.add(3, "M");
          }
        }

        if (plan.plan === "annually") {
          payments.push({
            dueDate: dueDate.clone().toDate(),
            amount: py * 0.975
          });
        }

        return {
          tenantId: plan.id,
          payments: payments
        };

      }).then(function(paymentsData) {


        return when.map(paymentsData, function(tenantPaymentData) {
          return Tenant.findOne(tenantPaymentData.tenantId).then(function(tenant) {
            return when.map(tenantPaymentData.payments, function(paymentData) {

              return RentPayment.create(paymentData).tap(function(payment) {
                return contract.addRentPayment(payment);
              }).tap(function(payment) {
                return tenant.addRentPayment(payment);
              });
            });
          });
        });
      });
    }).then(function(payments){
      res.send(payments);
    });
    
  }
};