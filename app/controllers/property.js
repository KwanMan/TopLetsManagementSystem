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
    models.Property.create(req.body).complete(function (property){
      res.send(property);
    });
  },

  getPropertyById: function (req, res){
    models.Property.find({
      where: {
        id: req.param('id')
      }
    }).success(function (property){
      res.send(property);
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

    models.Receipt.create({
      payee: req.body.payee,
      date: new Date(2014, 6, 24, 12, 0, 0),
      amount: req.body.amount
    }).tap(function(receipt) {
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
  }

};