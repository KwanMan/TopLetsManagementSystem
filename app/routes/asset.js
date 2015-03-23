var router = require('express').Router();

router.get('/:filename', function(req, res) {

  if (req.query.download) {
    res.download("/Users/tommy/Documents/dev/TopLetsManagementSystem/uploads/" + req.params.filename);
  } else {
    res.sendFile("/Users/tommy/Documents/dev/TopLetsManagementSystem/uploads/" + req.params.filename);    
  }
  
});

module.exports = {
  mountPath: "/asset",
  routes: router,
  protected: true
};