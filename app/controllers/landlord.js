var models = require('../models');
var _ = require('lodash');

module.exports = {
  getLandlords: function (req, res){
    models.Landlord.findAll().success(function (landlords){
      res.send(landlords);
    });
  },

  createLandlord: function (req, res){
    models.Landlord.create(req.body).success(function (landlord){
      res.send(landlord);
    });
  },

  getLandlordById: function (req, res){
    models.Landlord.find({
      where: {
        id: req.params.id
      }
    }).success(function (landlord){
      res.send(landlord);
    });
  },

  updateLandlord: function(req, res) {
    models.Landlord.findOne(req.params.id)

    .then(function(landlord) {
      if (!landlord) {
        res.status(400).send("No landlord found");
        return;
      }

      var newData = _.pick(req.body, ['forename', 'surname', 'email', 'contactNumber', 'address']);
      landlord = _.assign(landlord, newData);
      return landlord.save();

    })

    .then(function(landlord) {
      res.status(200).end();
    })

    .catch(function(err) {
      console.log(err);
      res.status(400).end();
    });
  },

  deleteLandlordById: function (req, res, next){
    models.Landlord.findOne(req.params.id).then(function (landlord){
      return landlord.destroy();
    }).then(function() {
      res.status(200).end();
    });
  },

  getProperties: function (req, res){

    models.Property.findAll({
      where: {
        landlord_id: req.params.id
      },
      include: [models.Landlord]
    }).success(function(properties) {
      res.send(properties);
    });
  },

  createProperty: function(req, res) {
    models.Property.create(req.body).success(function(property) {

      models.Landlord.findOne(req.params.id).then(function(landlord) {
        property.setLandlord(landlord);
      });

    }).then(function() {
      res.status(200).end();
    });
  },

  generateReports: function (req, res){
    res.send(dataGenerator.getData());
  }

};