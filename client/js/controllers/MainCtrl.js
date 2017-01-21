'use strict'

var app = angular.module('liveTracker')

app.controller('MainCtrl', function ($scope, $location, serverData) {
  // add current user's info to scope. redirect to /login if no current user
  serverData.getCurrentlyAuthorizedUser()
    .then(function (response) {
      $scope.currentUser = response
    }, function (err) {
      console.log(err.status + ': No authorized user found. Redirecting to /login.')
      $location.path('/login')
    })
})
