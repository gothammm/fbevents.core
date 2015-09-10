var express = require('express'),
  logger = require('winston'),
  router = express.Router();

//Include route modules

router = require('./events')(router);

module.exports = router;