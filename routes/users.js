var express = require('express');
var models = require('../models/models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`This will print the attribute I set earlier`);
});


module.exports = router;
