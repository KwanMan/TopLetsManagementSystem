var models = require('../models');

module.exports = {

  getTenants: function (req, res){
    models.Tenant.findAll().success(function (tenants){
      res.send(tenants);
    });
  }, 

  createTenant: function (req, res){
    models.Tenant.create(req.body).success(function (tenant){
      res.send(tenant);
    });
  },

  getTenantById: function (req, res){
    models.Tenant.find({
      where: {
        id: req.param('id')
      }
    }).success(function (tenant){
      res.send(tenant);
    });
  },

  deleteTenantById: function (req, res){
    models.Tenant.find({
      where: {
        id: req.param('id')
      }
    }).success(function (tenant){
      tenant.destroy().success(function (){
        res.sendStatus(200);
      });
    });
  }

};