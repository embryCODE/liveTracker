'use strict'

var passport = require('passport')
var SpotifyStrategy = require('passport-spotify').Strategy
var User = require('../models').User

var PORT = process.env.PORT || 3000
var HOST = process.env.PROD_HOST || 'http://localhost:' + PORT
var CALLBACK_URL = HOST + '/auth/callback'

var appKey = process.env.SPOTIFY_CLIENT_ID || require('../../config/apiConfig').spotify.client_id
var appSecret = process.env.SPOTIFY_CLIENT_SECRET || require('../../config/apiConfig').spotify.client_secret

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
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
  }))
