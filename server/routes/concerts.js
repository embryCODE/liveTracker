'use strict';

var router = require('express').Router();
var concertCtrl = require('../controllers').ConcertCtrl;
var jamBaseCtrl = require('../controllers').JamBaseCtrl;


router.get('/concerts', concertCtrl.getAllConcerts);

router.post('/concerts', concertCtrl.createConcert);

router.get('/concerts/get-local-concerts', jamBaseCtrl.getLocalConcerts);

router.get('/concerts/:id', concertCtrl.getConcert);

module.exports = router;
