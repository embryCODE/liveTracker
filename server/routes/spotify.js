'use strict';

var router = require('express').Router();
var ctrl = require('../controllers').SpotifyCtrl;



router.post('/spotify', ctrl.getTopArtists);

module.exports = router;
