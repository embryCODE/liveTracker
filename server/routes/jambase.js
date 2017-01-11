'use strict';

var router = require('express').Router();
var ctrl = require('../controllers').JamBaseCtrl;



router.post('/jambase', ctrl.getLocalConcerts);

module.exports = router;
