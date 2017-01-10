'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thingSchema = new Schema({
  name: {
    type: String,
    default: ''
  }
});

var Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
