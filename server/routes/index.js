'use strict';

var router = require('express').Router();

// require routes
var users = require('./users');
var concerts = require('./concerts');
var auth = require('./auth');

// use routes
router.use('/api', users);
router.use('/api', concerts);
router.use('/auth', auth);

module.exports = router;
