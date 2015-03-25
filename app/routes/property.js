var router = require('express').Router();
var controller = require("../controllers/property");
var multer = require("multer");
var uuid = require("uuid");

router.get('/', controller.getProperties);

router.post('/', controller.createProperty);

router.get('/:id', controller.getPropertyById);

router.put('/:id', controller.updateProperty);

router.delete('/:id', controller.deletePropertyById);

// Get unassigned rent payments
router.get('/:id/rent-payment/new', controller.getNewRentPayments);

// Get unsassigned receipts
router.get('/:id/receipt/new', controller.getNewReceipts);

router.post('/:id/receipt', multer({ 
    dest: './uploads',
    rename: function (fieldname, filename) {
      return Date.now() + uuid.v4();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting upload...');
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
  }), controller.createReceipt);

router.post('/:id/report', controller.createReport);

router.get('/:id/report/:year/:month', controller.getReportByDate);

router.get('/:id/report', controller.getReports);

router.post('/:id/contract', controller.createContract);

router.get('/:id/contract/:year', controller.getContract);

module.exports = {
  mountPath: "/property",
  routes: router,
  protected: true
};