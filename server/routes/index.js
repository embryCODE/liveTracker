'use strict';

var router = require('express').Router();

// require routes
var users = require('./users');

// use routes
router.use('/api', users);

module.exports = router;
