'use strict';

var app = require('express');
var User = require('../models').User;
var Concert = require('../models').Concert;



module.exports.getLocalConcerts = function(req, res, next) {
  res.send('JamBaseCtrl should do something');
  // call to jambase api for concerts in zip code

  // check user's favorite artists

  // build array of concerts by those artists

  // return the array
};
