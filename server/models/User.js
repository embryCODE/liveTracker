'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  zip: Number,
  password: String,
  favArtists: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
