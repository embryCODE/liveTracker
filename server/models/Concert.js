'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var concertSchema = new Schema({
  venue: String,
  date: Date
});

var Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;
