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

  getContractsByYear: function(req, res) {
    Contract.findAll({
      where: {
        year: req.params.year
      }
    }).then(function(contracts) {
      res.send(contracts);
    });
  },

  createContract: function (req, res){

    // dummy data
    req.body = {
      houseId: 1,
      year: 2014,
      startDate: new Date().getTime(),
      endDate: new Date(2015, 6, 28),
      tenants: [{
        tenantId: 1,
        rentPayments: [
          {
            dueDate: new Date(2014, 6, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 7, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 8, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 9, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 10, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 11, 24, 12, 0, 0),
            amount: 367.97
          }
        ]
      }, {
        tenantId: 2,
        rentPayments: [
          {
            dueDate: new Date(2014, 6, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 7, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 8, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 9, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 10, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 11, 24, 12, 0, 0),
            amount: 367.97
          }
        ]
      },{
        tenantId: 3,
        rentPayments: [
          {
            dueDate: new Date(2014, 6, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 7, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 8, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 9, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 10, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2015, 11, 24, 12, 0, 0),
            amount: 367.97
          }
        ]
      },{
        tenantId: 4,
        rentPayments: [
          {
            dueDate: new Date(2014, 6, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 7, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 8, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 9, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 10, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 11, 24, 12, 0, 0),
            amount: 367.97
          }
        ]
      },{
        tenantId: 5,
        rentPayments: [
          {
            dueDate: new Date(2014, 6, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 7, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 8, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 9, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 10, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 11, 24, 12, 0, 0),
            amount: 367.97
          }
        ]
      },{
        tenantId: 6,
        rentPayments: [
          {
            dueDate: new Date(2014, 6, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 7, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 8, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 9, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 10, 24, 12, 0, 0),
            amount: 367.97
          }, {
            dueDate: new Date(2014, 11, 24, 12, 0, 0),
            amount: 367.97
          }
        ]
      }]
    };

    // Create the contract
    Contract.create({
      year: req.body.year,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    })

    .tap(function (contract) {
      Property.findOne(req.body.houseId).then(function (property) {
        contract.setProperty(property);
      });

    })

    .tap(function(contract) {
      var tenants = req.body.tenants.map(function(tenant) {
        return tenant.tenantId;
      });

      when.map(tenants, function(tenantId) {
        Tenant.findOne(tenantId).then(function(tenant) {
          contract.addTenant(tenant);
        });
      });
    })

    // Create the rent payments
    .then(function (contract){

      // Find each tenant
      return when.map(req.body.tenants, function (tenantData, index){
        return Tenant.find(tenantData.tenantId).then(function (tenant){

          // Create the tenant's rent payments
          return when.map(tenantData.rentPayments, function (rentPaymentData, index){
            return RentPayment.create(rentPaymentData).then(function (rentPayment){
              rentPayment.setTenant(tenant);
              rentPayment.setContract(contract);
              return rentPayment;
            });
          });

        });
      });

    })

    // Send the result
    .then(function (rentPayments){
      res.send(rentPayments);
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