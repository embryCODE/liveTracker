'use strict';

var router = require('express').Router();
var ctrl = require('../controllers').ConcertCtrl;


router.get('/concerts', ctrl.getAllConcerts);

router.post('/concerts', ctrl.createConcert);

router.get('/concerts/:id', ctrl.getConcert);

module.exports = router;
