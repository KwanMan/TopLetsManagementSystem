var models = require('../models');
var router = require('express').Router();
var checkAccessToken = require('../middleware/checkAccessToken');

router.route('/')

  .get(function (req, res){
    models.Property.findAll({
      include: [models.Landlord]
    }).success(function (properties){
      res.send(properties);
    });
  })

  .post(function (req, res){
    models.Property.create(req.body).complete(function (property){
      res.send(property);
    });
  });

router.route('/:id')

  .get(function (req, res){
    models.Property.find({
      where: {
        id: req.param('id')
      }
    }).success(function (property){
      res.send(property);
    });
  })

  .delete(function (req, res){
    models.Property.find({
      where: {
        id: req.param('id')
      }
    }).success(function (property){
      property.destroy().success(function (){
        res.sendStatus(200);
      });
    });
  });

module.exports = {
  mountPath: "/property",
  routes: router,
  protected: true
};