'use strict'

var router = require('express').Router()
var express = require('express')
var path = require('path')
var users = require('./users')
var auth = require('./auth')

// route all incoming requests to angular app first
router.use('/', express.static('client', { redirect: false }))

// route api or auth requests to the proper controller
router.use('/api', users)
router.use('/auth', auth)

// route all other requests back to the angular app
router.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/index.html'))
})

module.exports = router
