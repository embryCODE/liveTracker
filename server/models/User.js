'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  spotifyId: String,
  access_token: String,
  refresh_token: String,
  email: String,
  name: String,
  zip: {
    type: String,
    trim: true,
    // Custom validation for zip code format.
    validate: {
      validator: function (zip) {
        return /(\d{5}([-]\d{4})?)/.test(zip)
      },
      message: 'Must be a valid zip code.'
    }
  },
  topArtists: [String],
  localConcerts: [
    {
      artist: String,
      venue: String,
      venueURL: String,
      date: Date
    }
  ]
})

var User = mongoose.model('User', userSchema)

module.exports = User
