'use strict';

var app = require('express');
var User = require('../models').User;
var Concert = require('../models').Concert;

var JamBase = require('node-jambase');
var key = require('../../config/apiConfig').jambase.api_key;
var jambase = new JamBase(key);



module.exports.getLocalConcerts = function(req, res, next) {

  // call to jambase api for concerts in zip code
  var today = new Date().toISOString();
  var nextYear = new Date();
  nextYear.setDate(nextYear.getDate() + 365);
  nextYear = nextYear.toISOString();

  User.findById(req.params.id)
    .then(function(user) {

      //
      jambase.getEventListBy_artistId_zipCode_radius_startDate_endDate(3498, user.zip, 100, today, nextYear, 0, function(err, results) {
          if (err) {
            res.json(err);
          }
          //
          res.json(results);
        });
    }).catch(function(error) {
      res.json(error);
    });
};

// localConcerts: [
//   {
//     artist: String,
//     venue: String,
//     venueURL: String,
//     date: Date
//   }
// ]
