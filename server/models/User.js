'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  spotifyId: String,
  email: String,
  name: String,
  zip: Number,
  password: String,
  favArtists: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
