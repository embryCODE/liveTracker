'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var concertSchema = new Schema({
  artist: String,
  venue: String,
  venueURL: String,
  date: Date
});

var Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;
