'use strict';

var app = require('express');
var User = require('../models').User;
var Concert = require('../models').Concert;

var JamBase = require('node-jambase');
var key = require('../../config/apiConfig').jambase.api_key;
var jambase = new JamBase(key);



module.exports.getLocalConcerts = function(req, res, next) {

  // set date variables
  var today = new Date().toISOString();
  var nextYear = new Date();
  nextYear.setDate(nextYear.getDate() + 365);
  nextYear = nextYear.toISOString();

  // find user by id
  User.findById(req.params.id)
    .then(function(user) {

      var topArtistsTest = ['Gil Gann'];

      // logic to query api, match with top artists, and build concerts array
      var localConcerts = [];

      jambase.getEventListBy_zipCode_radius_startDate_endDate(user.zip, 50, today, nextYear, 0, function(err, results) {
          if (err) {
            res.json(err);
          }
          results.Events.forEach(function(event) {
            event.Artists.forEach(function(artist) {
              if (topArtistsTest.indexOf(artist.Name) > -1) {
                var newEvent = {
                  artist: artist.Name,
                  venue: event.Venue.Name,
                  venueURL: event.Venue.Url,
                  date: event.Date
                };

                localConcerts.push(newEvent);
              }
            });
          });
          res.json(localConcerts);
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
