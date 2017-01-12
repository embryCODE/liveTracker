'use strict';

var router = require('express').Router();

// require routes
var users = require('./users');
var concerts = require('./concerts');
var auth = require('./auth');
var jambase = require('./jambase');

// use routes
router.use('/api', users);
router.use('/api', concerts);
router.use('/api', jambase);
router.use('/auth', auth);

module.exports = router;
