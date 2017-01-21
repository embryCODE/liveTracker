'use strict'

var app = angular.module('liveTracker')

app.controller('MainCtrl', function ($scope, $location, serverData) {
  $scope.test = 'This is a test of the mainCtrl scope.'

  serverData.getCurrentlyAuthorizedUser()
    .then(function (response) {
      $scope.currentUser = response
    }, function (err) {
      console.log(err.status + ': No authorized user found. Redirecting to /login.')
      $location.path('/login')
    })
})
