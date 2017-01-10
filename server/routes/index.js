'use strict';

var router = require('express').Router();

// require routes
var users = require('./users');
var concerts = require('./concerts');

// use routes
router.use('/api', users);
router.use('/api', concerts);

module.exports = router;
