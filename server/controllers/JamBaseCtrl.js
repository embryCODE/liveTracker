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

      // array to hold found local concerts
      var localConcerts = [];

      // initial api call to get first page
      jambase.getEventListBy_zipCode_radius_startDate_endDate(user.zip, 50, today, nextYear, 0, function(err, results) {
        if (err) {
          res.json(err);
        }

        // calculate necessary total pages
        var pagesToQuery = Math.round(results.Info.TotalResults / 50);

        // add found concerts from first page to localConcerts array
        localConcerts.concat(checkConcertsForArtists(results, user.topArtists));

        // loop through remaining pages, querying API for each page
        for (var i = 1; i < pagesToQuery; i++) {

          // query current page in loop
          jambase.getEventListBy_zipCode_radius_startDate_endDate(user.zip, 50, today, nextYear, i, function(err, results) {
            // add found concerts from current page to localConcerts array
            localConcerts.concat(checkConcertsForArtists(results, user.topArtists));
          });
        }

        res.json(localConcerts);

      });

    }).catch(function(error) {
      res.json(error);
    });

  // returns an array of found concerts. takes results from api and user object.
  function checkConcertsForArtists(concerts, artists) {
    var concertList = [];
    concerts.Events.forEach(function(event) {
      event.Artists.forEach(function(artist) {
        if (artists.indexOf(artist.Name) > -1) {
          var newEvent = {
            artist: artist.Name,
            venue: event.Venue.Name,
            venueURL: event.Venue.Url,
            date: event.Date
          };

          concertList.push(newEvent);
        }
      });
    });
    return concertList;
  }
};

// localConcerts: [
//   {
//     artist: String,
//     venue: String,
//     venueURL: String,
//     date: Date
//   }
// ]
