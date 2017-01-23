'use strict'

var app = angular.module('liveTracker')

app.controller('MainCtrl', function ($scope, $location, apiService) {
  // add current user's info to scope. redirect to /login if no current user
  apiService.getCurrentlyAuthorizedUser()
    .then(function (response) {
      $scope.currentUser = response.data
    }, function (err) {
      console.log(err.status + ': No authorized user found. Redirecting to /login.')
      $location.path('/login')
    })

  $scope.addZip = function (id, zipParam) {
    apiService.addZipCodeToUser(id, zipParam)
      .then(function () {
        $scope.currentUser.zip = zipParam
      }, function (err) {
        // handle this error better
        console.log(err)
      })
  }
})
