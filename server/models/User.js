'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  spotifyId: String,
  access_token: String,
  refresh_token: String,
  email: String,
  name: String,
  zip: Number,
  topArtists: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
