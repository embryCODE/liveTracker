'use strict'

var app = angular.module('liveTracker')

// talk to back end and return requested data as JSON
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
    addZipCodeToUser: function (id, zipParam) {
      return $http.post('/api/users/' + id + '/set-zip', {
        'zip': zipParam
      })
    },
    addLocalConcertsToUser: function (id) {
      return $http.post('/api/users/' + id + '/set-local-concerts')
    }
  }
}])
