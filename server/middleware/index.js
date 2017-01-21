'use strict'

module.exports.authCheck = function (req, res, next) {
  // FAKE AUTHORIZATION BECAUSE I DON'T GET IT YET
  return next()

  // if (req.isAuthenticated()) {
  //   console.log('Request is authenticated.')
  //   return next()
  // }
  // console.log('Request is not authenticated.')
  // res.status(401).json('You must login to Spotify.')
}
