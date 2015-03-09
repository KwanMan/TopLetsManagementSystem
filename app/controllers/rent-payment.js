var models = require('../models');

// Set rent payment as paid
module.exports = {

  markPaymentPaid: function (req, res){

    models.RentPayment.find(req.params.id).then(function (payment){
      payment.paid = true;
      payment.save();
      return payment;
    }).then(function (payment){
      res.send(payment);
    });

  }
};