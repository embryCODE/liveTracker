'use strict'

var passport = require('passport')
var SpotifyStrategy = require('passport-spotify').Strategy
var User = require('../models').User

// sets port, host, and callback_url either with heroku constants or locally
var PORT = process.env.PORT || 3000
var HOST = process.env.PROD_HOST || 'http://localhost:' + PORT
var CALLBACK_URL = HOST + '/auth/callback'

// get Spotify api keys from heroku env or the apiConfig.js file
var appKey = process.env.SPOTIFY_CLIENT_ID ||
             require('../../config/apiConfig').spotify.client_id
var appSecret = process.env.SPOTIFY_CLIENT_SECRET ||
                require('../../config/apiConfig').spotify.client_secret

// adds user to session
passport.serializeUser(function (user, done) {
  done(null, user._id)
})

// removes user from session
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// redirects to Spotify for login
passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    // find user in database from Spotify ID
    User.findOne({
      spotifyId: profile.id
    }, function (err, results) {
      if (err) return done(err)

      if (results) {
        // if user found, updated record in db
        User.findByIdAndUpdate(results.id, {
          spotifyId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          access_token: accessToken,
          refresh_token: refreshToken
        }, function (err, results) {
          if (err) throw err
          return done(null, results)
        })
      } else {
        // if no user found, create new user using data from api
        User.create({
          spotifyId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          access_token: accessToken,
          refresh_token: refreshToken
        }, function (err, results) {
          if (err) throw err
          return done(null, results)
        })
      }
    })
  })
)
