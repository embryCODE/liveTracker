'use strict'

var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var passport = require('passport')
var routes = require('./routes')
var session = require('express-session')
var app = express()

// database connection
var db = require('../config/db')
mongoose.connect(db.url)

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static(path.join(__dirname, '../client')))

// session and passport
app.use(session({
  secret: 'mashtastic',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // send error status
  res.status(err.status || 500)
  // send error message as JSON
  res.json({
    error: {
      status: err.status,
      message: err.message
    }
  })
})

module.exports = app
