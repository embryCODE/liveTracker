'use strict';

var path = require('path');
var Thing = require('../models/thing');

module.exports = function(app) {
  // server routes
  app.get('/api/things', function(req, res) {
    res.send('This is a sample server route for the api.');
  });

  // angular route
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client', 'index.html'));
  });
};
