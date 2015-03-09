var models = require('../models');
var router = require('express').Router();
var checkAccessToken = require('../middleware/checkAccessToken');

router.route('/')

  // Get all
  .get(function (req, res){
    models.Landlord.findAll().success(function (landlords){
      res.send(landlords);
    });
  })

  // Create new
  .post(function (req, res){
    models.Landlord.create(req.body).success(function (landlord){
      res.send(landlord);
    });
  });

router.route('/:id')

  // Get by ID
  .get(function (req, res){
    models.Landlord.find({
      where: {
        id: req.param('id')
      }
    }).success(function (landlord){
      res.send(landlord);
    });
  })

  // Delete by ID
  .delete(function (req, res, next){
    models.Landlord.find({
      where: {
        id: req.param('id')
      }
    }).success(function (landlord){
      landlord.destroy().success(function (){
        res.sendStatus(200);
      });
    });
  });

router.route('/:id/properties')

  .get(function (req, res){

    models.Property.findAll({
      where: {
        landlord_id: req.param('id')
      }
    }).success(function(properties) {

      res.send(properties);

    });

  });

router.post('/:id/generateReports', function (req, res){

  res.send(dataGenerator.getData());

});

module.exports = {
  mountPath: "/landlord",
  routes: router,
  protected: true
};