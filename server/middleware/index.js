'use strict'

module.exports.authCheck = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log('Request is authenticated.')
    return next()
  }
  console.log('Request is not authenticated.')
  res.status(401).json('Login to Spotify and try that again.')
}
