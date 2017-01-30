'use strict'

var User = require('../models').User

module.exports.getCurrentUser = function (req, res, next) {
  if (!req.user) {
    var err = new Error('User is not authenticated.')
    err.status = 401
    return next(err)
  }

  res.json(req.user)
}

module.exports.getAllUsers = function (req, res, next) {
  User.find()
    .then(function (results) {
      res.json(results)
    }).catch(function (error) {
      res.json(error)
    })
}

module.exports.getUserById = function (req, res, next) {
  User.findById(req.params.id)
    .then(function (results) {
      res.json(results)
    }).catch(function (error) {
      res.json(error)
    })
}

module.exports.createUser = function (req, res, next) {
  User.create(req.body)
    .then(function (results) {
      res.json(results)
    }).catch(function (error) {
      res.json(error)
    })
}

module.exports.addZip = function (req, res, next) {
  User.findById(req.params.id)
    .then(function (user) {
      user.zip = req.body.zip
      user.save(function (err, updatedUser) {
        if (err) return next(err)
        res.json(updatedUser)
      })
    }).catch(function (error) {
      res.json(error)
    })
}
