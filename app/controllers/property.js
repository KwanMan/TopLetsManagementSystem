var models = require('../models');

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
  }

};