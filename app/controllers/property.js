var models = require('../models');
var when = require('when');
var _ = require('lodash');

module.exports = {
  getProperties: function (req, res){
    models.Property.findAll({
      include: [models.Landlord]
    }).success(function (properties){
      res.send(properties);
    });
  },

  createProperty: function (req, res){
    models.Property.create(req.body).done(function (property){
      res.send(property);
    });
  },

  getPropertyById: function (req, res){
    models.Property.find({
      where: {
        id: req.params.id
      },
      include: [models.Landlord]
    }).success(function (property){
      res.send(property);
    });
  },

  updateProperty: function(req, res) {
    models.Property.findOne(req.params.id)

    .then(function(property) {
      if (!property) {
        res.status(400).send("No property found");
        return;
      }

      var newData = _.pick(req.body, ['number', 'street', 'postcode', 'bedrooms']);
      property = _.assign(property, newData);
      return property.save();

    })

    .then(function(property) {
      res.status(200).end();
    })

    .catch(function(err) {
      console.log(err);
      res.status(400).end();
    });
  },

  deletePropertyById: function (req, res){
    models.Property.find({
      where: {
        id: req.param('id')
      }
    }).success(function (property){
      property.destroy().success(function (){
        res.sendStatus(200);
      });
    });
  },

  getNewRentPayments: function(req, res) {
    models.Property.findOne(req.param('id'))

      .then(function(property) {
        return property.getContracts();
      })

      .then(function(contracts) {
        return when.map(contracts, function(contract) {
          return contract.getRentPayments({
            where: {
              property_report_id: null
            },
            include: [models.Tenant]
          });
        });
      })

      .then(function(rentPayments) {
        res.send(_.flatten(rentPayments));
      });
  },

  getNewReceipts: function(req, res) {
    models.Property.findOne(req.param('id'))

      .then(function(property) {
        return property.getReceipts({
          where: {
            property_report_id: null
          }
        });
      })

      .then(function(receipts) {
        res.send(receipts);
      });

  },

  createReceipt: function (req, res){

    var data = {
      payee: req.body.payee,
      date: req.body.date,
      amount: req.body.amount
    };

    if (req.body.note) {
      data.note = req.body.note;
    }

    if (req.files.receipt) {
      data.filename = req.files.receipt.name;
    }

    models.Receipt.create(data).tap(function(receipt) {
      return models.Property.findOne(req.param('id')).then(function(property) {
        receipt.setProperty(property);
      });
    }).then(function(receipt) {
      res.send(receipt);
    }).catch(function(err) {
      res.send(err);
    });

  },

  createReport: function(req, res) {

    // Create report
    models.PropertyReport.create({
      year: req.body.year,
      month: req.body.month,
      finalised: false
    })

    // Set the parent property
    .tap(function(report) {
      return report.setProperty(req.param('id'));
    })

    // Associate with rent payments
    .tap(function(report) {

      return when.map(req.body.rentPayments, function(id) {
        return models.RentPayment.findOne(id);
      })

      .then(function(rentPayments) {
        return report.setRentPayments(rentPayments);
      });

    })

    // Associate with receipts
    .tap(function(report) {

      return when.map(req.body.receipts, function(id) {
        return models.Receipt.findOne(id);
      })

      .then(function(receipts) {
        return report.setReceipts(receipts);
      });

    })

    // Create and associate fees
    .tap(function(report) {
      return when.map(req.body.fees, function(feeData) {

        // Create
        return models.Fee.create({
          note: feeData.note,
          amount: feeData.amount
        })

        // Associate
        .then(function(fee) {
          return fee.setPropertyReport(report);
        });

      });
    })

    .then(function(report) {
      res.send(report);
    });
  },

  getReportByDate: function(req, res) {
    models.PropertyReport.findOne({
      where: {
        property_id: req.param('id'),
        year: req.param('year'),
        month: req.param('month')
      },
      include: [models.Property]
    }).then(function(report) {
      res.send(report);
    });
  },

  getReports: function(req, res) {
    models.Property.findOne(req.params.id).then(function(property) {
      return property.getPropertyReports();
    }).then(function(reports) {
      console.log(reports);
      res.send(reports);
    });
  },

  createContract: function(req, res) {

    var tasks = [];

    tasks.push(models.Property.findOne(req.params.id));
    tasks.push(when.map(req.body.tenants, function(id) {
      return models.Tenant.findOne(id);
    }));

    // When all dependencies are found
    when.all(tasks).then(function(results) {
      var property = results[0];
      var tenants = results[1];

      return models.Contract.create({
        year: req.body.year,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        perWeek: req.body.perWeek
      }).then(function(contract) {
        contract.setProperty(property);
        contract.setTenants(tenants);
        return contract;
      });


    }).then(function(contract) {
      res.send(contract);
    });
  },

  getContract: function(req, res) {
    models.Contract.findOne({
      where: {
        property_id: req.params.id,
        year: req.params.year
      },
      include: [models.RentPayment]
    }).then(function(contract) {
      res.send(contract);
    });
  }

};