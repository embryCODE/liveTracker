'use strict';

var app = require('express');
var Concert = require('../models').Concert;

module.exports.getAllConcerts = function(req, res, next) {
  Concert.find()
    .then(function(results) {
      res.json(results);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports.createConcert = function(req, res, next) {
  Concert.create(req.body)
    .then(function(results) {
      res.json(results);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports.getConcert = function(req, res, next) {
  Concert.findById(req.params.id)
    .then(function(results) {
      res.json(results);
    }).catch(function(error) {
      res.json(error);
    });
};
