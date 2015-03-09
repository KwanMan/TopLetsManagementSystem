var models = require('../models');
var router = require('express').Router();
var when = require('when');

module.exports = {
  mountPath: "/rent-payment",
  routes: router,
  protected: true
};

// Set rent payment as paid
router.post('/pay/:id', function (req, res){

  models.RentPayment.find(req.params.id).then(function (payment){
    payment.paid = true;
    payment.save();
    return payment;
  }).then(function (payment){
    res.send(payment);
  });

});