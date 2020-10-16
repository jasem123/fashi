var express = require('express');
var router = express.Router();

/* GET Dashboard page. */
router.get('/Dashboard', function(req, res, next) {
  res.render('Dashboard', { title: 'Express' });
});


module.exports = router;