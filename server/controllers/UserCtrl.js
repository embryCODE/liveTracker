'use strict';

var app = require('express');
var User = require('../models').User;

module.exports.getAllUsers = function(req, res, next) {
  User.find()
    .then(function(results) {
      res.json(results);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports.createUser = function(req, res, next) {
  User.create(req.body)
    .then(function(results) {
      res.json(results);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports.getUser = function(req, res, next) {
  User.findById(req.params.id)
    .then(function(results) {
      res.json(results);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports.addZip = function(req, res, next) {
  User.findById(req.params.id)
    .then(function(user) {
      user.zip = parseInt(req.body.zip);
      user.save(function(err, updatedUser) {
        if (err) throw err;
        res.json(updatedUser);
      });
    }).catch(function(error) {
      res.json(error);
    });
};
