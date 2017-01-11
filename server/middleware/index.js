'use strict';

module.exports.authCheck = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json('You must login to Spotify.');
};
