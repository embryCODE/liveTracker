'use strict'

var app = angular.module('mean_template')

app.factory('Thing', ['$http', function ($http) {
  return {
    get: function () {
      return $http.get('/api/things')
    },
    create: function (thingData) {
      return $http.post('/api/things', thingData)
    },
    delete: function (id) {
      return $http.delete('/api/things/' + id)
    }
  }
}])
