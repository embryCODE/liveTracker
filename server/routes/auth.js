'use strict';

var passport = require('passport');
var ctrl = require('../controllers').AuthCtrl;
var router = require('express').Router();

// redirect to spotify for authentication
router.get('/login',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read'],
    showDialog: true
  }),
  function(req, res) {});

// return back here after spotify authentication
router.get('/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/',
    successRedirect: '/'
  })
);

// logout and redirect to home page
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
