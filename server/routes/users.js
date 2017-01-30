'use strict'

var router = require('express').Router()
var userCtrl = require('../controllers').UserCtrl
var spotifyCtrl = require('../controllers').SpotifyCtrl
var jamBaseCtrl = require('../controllers').JamBaseCtrl
var mid = require('../middleware')

// get currently authenticated user
router.get('/current-user', mid.authCheck, userCtrl.getCurrentUser)

router.get('/users', userCtrl.getAllUsers)

router.get('/users/get-local-concerts', mid.authCheck, jamBaseCtrl.getLocalConcerts)

router.get('/users/:id', mid.authCheck, userCtrl.getUserById)

router.post('/users', userCtrl.createUser)

router.post('/users/:id/set-zip', mid.authCheck, userCtrl.addZip)

router.post('/users/:id/set-top-artists', mid.authCheck, spotifyCtrl.setUserTopArtists)

module.exports = router
