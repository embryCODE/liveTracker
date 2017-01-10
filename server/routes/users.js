'use strict';

var router = require('express').Router();
var ctrl = require('../controllers').UserCtrl;


router.get('/users', ctrl.getAllUsers);

router.post('/users', ctrl.createUser);

router.get('/users/:id', ctrl.getUser);

module.exports = router;
