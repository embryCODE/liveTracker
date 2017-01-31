'use strict'

var router = require('express').Router()
var users = require('./users')
var auth = require('./auth')

router.use('/api', users)
router.use('/auth', auth)

module.exports = router
