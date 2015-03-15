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
  }
};