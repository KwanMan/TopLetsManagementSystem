var models = require('../models');

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
        id: req.param('id')
      }
    }).success(function (landlord){
      res.send(landlord);
    });
  },

  deleteLandlordById: function (req, res, next){
    models.Landlord.find({
      where: {
        id: req.param('id')
      }
    }).success(function (landlord){
      landlord.destroy().success(function (){
        res.sendStatus(200);
      });
    });
  },

  getProperties: function (req, res){

    models.Property.findAll({
      where: {
        landlord_id: req.param('id')
      }
    }).success(function(properties) {
      res.send(properties);
    });
  },

  generateReports: function (req, res){
    res.send(dataGenerator.getData());
  }

};