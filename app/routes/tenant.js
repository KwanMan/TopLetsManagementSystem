var models = require('../models');
var router = require('express').Router();

router.route('/')

  .get(function (req, res){
    models.Tenant.findAll().success(function (tenants){
      res.send(tenants);
    });
  })

  .post(function (req, res){
    models.Tenant.create(req.body).success(function (tenant){
      res.send(tenant);
    });
  });

router.route('/:id')

  .get(function (req, res){
    models.Tenant.find({
      where: {
        id: req.param('id')
      }
    }).success(function (tenant){
      res.send(tenant);
    });
  })

  .delete(function (req, res){
    models.Tenant.find({
      where: {
        id: req.param('id')
      }
    }).success(function (tenant){
      tenant.destroy().success(function (){
        res.sendStatus(200);
      });
    });
  });

module.exports = {
  mountPath: "/tenant",
  routes: router,
  protected: true
};