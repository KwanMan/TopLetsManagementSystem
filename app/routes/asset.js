var router = require('express').Router();

router.get('/:filename', function(req, res) {

  res.sendFile("/Users/tommy/Documents/dev/TopLetsManagementSystem/uploads/" + req.params.filename);
});

module.exports = {
  mountPath: "/asset",
  routes: router,
  protected: true
};