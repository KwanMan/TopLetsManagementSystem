var models = require('../models');

module.exports = {
  getByDate: function(req, res) {
    models.PropertyReport.findAll({
      where: {
        year: req.param('year'),
        month: req.param('month')
      },
      include: [models.Property]
    }).then(function(reports) {
      res.send(reports);
    });
  },

  getReport: function(req, res) {
    models.PropertyReport.findOne({
      where: {
        id: req.params.id
      },
      include: [
        models.Property,
        models.Receipt,
        {
          model: models.RentPayment,
          include: [models.Tenant]
        }
      ]
    }).then(function(report) {
      res.send(report);
    });
  }
};