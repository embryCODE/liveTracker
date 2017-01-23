'use strict'

var app = angular.module('liveTracker')

app.controller('MainCtrl', function ($scope, $location, $rootScope, apiService) {
  // add current user's info to scope. redirect to /login if no current user
  apiService.getCurrentlyAuthorizedUser()
    .then(function (response) {
      apiService.addZipCodeToUser(response.data._id)
      .then(function (response) {
        $scope.currentUser = response
      })
    }, function (err) {
      console.log(err.status + ': No authorized user found. Redirecting to /login.')
      $location.path('/login')
    })
})
