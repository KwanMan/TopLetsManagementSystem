var models = require('../models');
var router = require('express').Router();
var when = require('when');

router.route('/')

.post(function (req, res){

  // dummy data
  var postData = {
    houseId: 1,
    startDate: new Date(2014, 7, 1),
    endDate: new Date(2015, 6, 28),
    tenants: [{
      tenantId: 1,
      rentPayments: [
        {
          dueDate: new Date(2014, 6, 24, 12, 0, 0),
          amount: 111.11
        }, {
          dueDate: new Date(2014, 7, 24, 12, 0, 0),
          amount: 111.11
        }, {
          dueDate: new Date(2014, 8, 24, 12, 0, 0),
          amount: 111.11
        }, {
          dueDate: new Date(2014, 9, 24, 12, 0, 0),
          amount: 111.11
        }, {
          dueDate: new Date(2014, 10, 24, 12, 0, 0),
          amount: 111.11
        }, {
          dueDate: new Date(2014, 11, 24, 12, 0, 0),
          amount: 111.11
        }
      ]
    }, {
      tenantId: 2,
      rentPayments: [
        {
          dueDate: new Date(2014, 6, 24, 12, 0, 0),
          amount: 222.22
        }, {
          dueDate: new Date(2014, 7, 24, 12, 0, 0),
          amount: 222.22
        }, {
          dueDate: new Date(2014, 8, 24, 12, 0, 0),
          amount: 222.22
        }, {
          dueDate: new Date(2014, 9, 24, 12, 0, 0),
          amount: 222.22
        }, {
          dueDate: new Date(2014, 10, 24, 12, 0, 0),
          amount: 222.22
        }, {
          dueDate: new Date(2014, 11, 24, 12, 0, 0),
          amount: 222.22
        }
      ]
    },{
      tenantId: 3,
      rentPayments: [
        {
          dueDate: new Date(2014, 6, 24, 12, 0, 0),
          amount: 333.33
        }, {
          dueDate: new Date(2014, 7, 24, 12, 0, 0),
          amount: 333.33
        }, {
          dueDate: new Date(2014, 8, 24, 12, 0, 0),
          amount: 333.33
        }, {
          dueDate: new Date(2014, 9, 24, 12, 0, 0),
          amount: 333.33
        }, {
          dueDate: new Date(2014, 10, 24, 12, 0, 0),
          amount: 333.33
        }, {
          dueDate: new Date(2014, 11, 24, 12, 0, 0),
          amount: 333.33
        }
      ]
    },{
      tenantId: 4,
      rentPayments: [
        {
          dueDate: new Date(2014, 6, 24, 12, 0, 0),
          amount: 444.44
        }, {
          dueDate: new Date(2014, 7, 24, 12, 0, 0),
          amount: 444.44
        }, {
          dueDate: new Date(2014, 8, 24, 12, 0, 0),
          amount: 444.44
        }, {
          dueDate: new Date(2014, 9, 24, 12, 0, 0),
          amount: 444.44
        }, {
          dueDate: new Date(2014, 10, 24, 12, 0, 0),
          amount: 444.44
        }, {
          dueDate: new Date(2014, 11, 24, 12, 0, 0),
          amount: 444.44
        }
      ]
    },{
      tenantId: 5,
      rentPayments: [
        {
          dueDate: new Date(2014, 6, 24, 12, 0, 0),
          amount: 555.55
        }, {
          dueDate: new Date(2014, 7, 24, 12, 0, 0),
          amount: 555.55
        }, {
          dueDate: new Date(2014, 8, 24, 12, 0, 0),
          amount: 555.55
        }, {
          dueDate: new Date(2014, 9, 24, 12, 0, 0),
          amount: 555.55
        }, {
          dueDate: new Date(2014, 10, 24, 12, 0, 0),
          amount: 555.55
        }, {
          dueDate: new Date(2014, 11, 24, 12, 0, 0),
          amount: 555.55
        }
      ]
    },{
      tenantId: 6,
      rentPayments: [
        {
          dueDate: new Date(2014, 6, 24, 12, 0, 0),
          amount: 666.66
        }, {
          dueDate: new Date(2014, 7, 24, 12, 0, 0),
          amount: 666.66
        }, {
          dueDate: new Date(2014, 8, 24, 12, 0, 0),
          amount: 666.66
        }, {
          dueDate: new Date(2014, 9, 24, 12, 0, 0),
          amount: 666.66
        }, {
          dueDate: new Date(2014, 10, 24, 12, 0, 0),
          amount: 666.66
        }, {
          dueDate: new Date(2014, 11, 24, 12, 0, 0),
          amount: 666.66
        }
      ]
    }]
  };


  // make the contract
  models.Contract.create({

    startDate: postData.startDate,
    endDate: postData.endDate

  }).then(function (contract){

    return when.map(postData.tenants, function (tenantData, index){
      return models.Tenant.find(tenantData.tenantId).then(function (tenant){

        // Create the rent payments
        return when.map(tenantData.rentPayments, function (rentPaymentData, index){
          return models.RentPayment.create(rentPaymentData).then(function (rentPayment){
            rentPayment.setTenant(tenant);
            rentPayment.setContract(contract);
            return rentPayment;
          });
        });

      });
    });

  }).then(function (rentPayments){
    res.send(rentPayments);
  });

});

module.exports = {
  mountPath: "/contract",
  routes: router
};