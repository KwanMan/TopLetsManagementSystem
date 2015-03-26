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

  }, markPaymentUnpaid: function (req, res){

    models.RentPayment.find(req.params.id).then(function (payment){
      if (payment.property_report_id !== null) {
        res.status(409).send("Payment attached to generated report");
        return;
      }
      payment.paid = false;
      payment.save();
      return payment;
    }).then(function (payment){
      res.send(payment);
    });

  }
};