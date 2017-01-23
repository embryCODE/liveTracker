'use strict'

var app = angular.module('liveTracker')

// talk to backend and return requested data as JSON
app.factory('apiService', ['$http', function ($http) {
  return {
    getCurrentlyAuthorizedUser: function () {
      return $http.get('/api/current-user')
    },
    getAllUsers: function () {
      return $http.get('/api/users')
    },
    getUserById: function (id) {
      return $http.get('/api/users/' + id)
    },
    addTopArtistsToUser: function (id) {
      return $http.post('/api/users/' + id + '/set-top-artists')
    },
    addZipCodeToUser: function (id, zipToAdd) {
      return $http.post('/api/users/' + id + '/set-zip', {
        'zip': zipToAdd
      })
    },
    addLocalConcertsToUser: function (id) {
      return $http.post('/api/users/' + id + '/set-local-concerts')
    }
  }
}])
