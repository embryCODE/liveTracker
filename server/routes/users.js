'use strict';

var router = require('express').Router();
var userCtrl = require('../controllers').UserCtrl;
var spotifyCtrl = require('../controllers').SpotifyCtrl;


router.get('/users', userCtrl.getAllUsers);

router.post('/users', userCtrl.createUser);

router.get('/users/:id', userCtrl.getUser);

router.post('/users/:id/add-zip', userCtrl.addZip);

router.get('/users/:id/add-top-artists', spotifyCtrl.getUserTopArtists);

module.exports = router;
