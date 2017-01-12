'use strict';

var app = require('express');
var User = require('../models').User;
var SpotifyWebAPI = require('spotify-web-api-node');

var spotifyAPI = new SpotifyWebAPI({
  clientId: require('../../config/apiConfig').spotify.client_id,
  clientSecret: require('../../config/apiConfig').spotify.client_secret,
  redirectUri: 'http://localhost:3000/auth/callback'
});



module.exports.getUserTopArtists = function(req, res, next) {

  var topArtists = [];

  User.findById(req.params.id)
    .then(function(user) {

      spotifyAPI.setAccessToken(user.access_token);

      // call to spotify api for current user's top artists
      spotifyAPI.getMyTopArtists({
          time_range: 'long_term'
        })
        .then(function(spotifyResults) {

          spotifyResults.body.items.forEach(function(artist) {
            topArtists.push(artist.name);
          });

          user.topArtists = topArtists;
          user.save(function(err, updatedUser) {
            if (err) throw err;
            res.json(updatedUser);
          });
        }, function(err) {
          res.json(err);
        });

    }).catch(function(error) {
      res.json(error);
    });

  // add those top artists to the user's database entry
};
