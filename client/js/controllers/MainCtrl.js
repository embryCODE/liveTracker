'use strict'

var app = angular.module('liveTracker')

app.controller('MainCtrl', function ($scope, serverData) {
  $scope.test = 'This is a test of the mainCtrl scope.'

  serverData.getAllUsers()
    .then(function (response) {
      $scope.allUsers = response
    })

  $scope.getCurrentUserById = function (id) {
    serverData.getUserById(id)
      .then(function (response) {
        $scope.currentUser = response
      })
  }
})
