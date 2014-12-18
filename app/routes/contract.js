var models = require('../models');
var router = require('express').Router();
var when = require('when');

module.exports = {
  mountPath: "/contract",
  routes: router
};

var Contract = models.Contract;
var Tenant = models.Tenant;
var RentPayment = models.RentPayment;

router.post('/', function (req, res){

  // dummy data
  req.body = {
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


  // Create the contract
  Contract.create({

    startDate: req.body.startDate,
    endDate: req.body.endDate

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

});

// Gets contract by id
router.get('/:id', function (req, res){
  Contract.find(req.params.id).then(function (contract){
    res.send(contract);
  });
});

// Gets tenants associated with contract
router.get('/:id/tenants', function (req, res){
  
  // Get the contract
  Contract.find({
    where: {
      id: req.params.id
    },
    include: [{
      model: RentPayment,
      include: [Tenant]
    }]
  })

  // Now extract all unique tenants
  .then(function (contract){

    return when.reduce(contract.RentPayments, function (tenants, rentPayment, index){
      
      var tenantMatches = function (incoming, current, index, array){
        return incoming.id === current.id;
      };
      
      if (!tenants.some(tenantMatches.bind(tenantMatches, rentPayment.Tenant))){
        // Only add to array if tenant is not already in there
        return tenants.concat(rentPayment.Tenant);
      }

      return tenants;

    }, []);

  })

  // Send the result
  .then(function (tenants){
    res.send(tenants);
  });
});