'use strict'

var User = require('../models').User
var SpotifyWebAPI = require('spotify-web-api-node')

// seperate from Spotify authorization. this is for talking to the API.
var spotifyAPI = new SpotifyWebAPI({

  // use either heroku env variables or apiConfig.js for api keys
  clientId: process.env.SPOTIFY_CLIENT_ID ||
            require('../../config/apiConfig').spotify.client_id,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET ||
                require('../../config/apiConfig').spotify.client_secret,
  redirectUri: 'http://localhost:3000/auth/callback'
})

// talk to Spotify API to get user's top artists. save to db.
module.exports.setUserTopArtists = function (req, res, next) {
  var topArtists = []

  // first find user be id in req param
  User.findById(req.params.id)
    .then(function (user) {
      // set access token from user that was just looked up
      spotifyAPI.setAccessToken(user.access_token)

      // call to spotify api for current user's top artists
      spotifyAPI.getMyTopArtists({
        time_range: 'long_term'
      })
        .then(function (spotifyResults) {
          // add top artists names only to array
          spotifyResults.body.items.forEach(function (artist) {
            topArtists.push(artist.name)
          })

          // add topArtists array to user's db entry
          user.topArtists = topArtists

          // save the user we've been editing
          user.save(function (err, updatedUser) {
            if (err) {
              res.json(err)
            }
            res.json(updatedUser)
          })
        }).catch(function (error) {
          res.json(error)
        })
    }).catch(function (error) {
      res.json(error)
    })
}
