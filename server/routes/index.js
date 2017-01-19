'use strict'

var router = require('express').Router()

// require routes
var users = require('./users')
var auth = require('./auth')

// use routes
router.use('/api', users)
router.use('/auth', auth)

module.exports = router
