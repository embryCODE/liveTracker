'use strict'

var app = angular.module('liveTracker')

app.controller('MainCtrl', function ($scope, $location, apiService) {
  // add current user's info to scope. redirect to /login if no current user
  apiService.getCurrentlyAuthorizedUser()
    .then(function (response) {
      apiService.addTopArtistsToUser(response.data._id)
        .then(function (response) {
          // if a zip code exists on the user, add local concerts to user
          if (response.data.zip) {
            apiService.addLocalConcertsToUser(response.data._id)
              .then(function (response) {
                $scope.currentUser = response.data
              }, function (err) {
                console.log(err)
              })
          } else {
            $scope.currentUser = response.data
          }
        }, function (err) {
          console.log(err)
        })
    }, function (err) {
      console.log(err.status + ': No authorized user found. Redirecting to /login.')
      $location.path('/login')
    })

  $scope.addZip = function (id, zipToAdd) {
    apiService.addZipCodeToUser(id, zipToAdd)
      .then(function (response) {
        // after adding zip code to user, add local concerts to user
        apiService.addLocalConcertsToUser($scope.currentUser._id)
          .then(function (response) {
            $scope.currentUser = response.data
          }, function (err) {
            console.log(err)
          })
      }, function (err) {
        console.log(err)
      })
  }
})
