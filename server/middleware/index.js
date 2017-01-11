'use strict';

module.exports.authCheck = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/'); // Change this to the angular login page.
};
