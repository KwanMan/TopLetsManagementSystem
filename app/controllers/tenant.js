var models = require('../models');
var _ = require('lodash');

module.exports = {

  getTenants: function (req, res){
    models.Tenant.findAll().success(function (tenants){
      res.send(tenants);
    });
  }, 

  createTenant: function (req, res){
    var data = _.pick(req.body, 'forename', 'surname', 'email', 'contactNumber');
    if (req.body.idNumber) {
      data.idNumber = req.body.idNumber;
    }
    models.Tenant.create(req.body).then(function (tenant){
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
  },

  getRentPayments: function(req, res) {
    models.Tenant.findOne(req.params.id).then(function(tenant) {
      return tenant.getRentPayments({
        order: 'dueDate ASC',
        include: [{
          model: models.Contract,
          include: [models.Property]
        }]
      });
    }).then(function(rentPayments) {
      res.send(rentPayments);
    });
  }

};