'use strict';

var router = require('express').Router();
var userCtrl = require('../controllers').UserCtrl;
var spotifyCtrl = require('../controllers').SpotifyCtrl;
var jamBaseCtrl = require('../controllers').JamBaseCtrl;


router.get('/users', userCtrl.getAllUsers);

router.post('/users', userCtrl.createUser);

router.get('/users/:id', userCtrl.getUser);

router.post('/users/:id/add-zip', userCtrl.addZip);

router.get('/users/:id/add-top-artists', spotifyCtrl.getUserTopArtists);

router.get('/users/:id/get-local-concerts', jamBaseCtrl.getLocalConcerts);

module.exports = router;
