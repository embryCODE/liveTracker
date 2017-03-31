'use strict'

var app = angular.module('liveTracker')

app.controller('MainCtrl', function ($scope, $location, apiService) {
  // add current user's info to scope. redirect to /login if no current user
  apiService.getCurrentlyAuthorizedUser()
    .then(function (response) {
      apiService.addTopArtistsToUser(response.data._id)
        .then(function (response) {
          $scope.currentUser = response.data
        }, function (err) {
          console.log(err)
        }
      )
    }, function (err) {
      console.log(err.status + ': No authorized user found. Redirecting to /login.')
      $location.path('/login')
    })

  // add zip code to user. takes user id (string) and zip code (number). returns user.
  $scope.addZip = function (id, zipToAdd) {
    apiService.addZipCodeToUser(id, zipToAdd)
      .then(function (response) {
        $scope.currentUser = response.data
      }, function (err) {
        console.log('Please enter a valid zip code.')
        console.log(err)
      }
    )
  }

  // returns array of local concerts. takes artistName and user's zip
  $scope.getLocalConcerts = function (artistName, zip) {
    $scope.artistJustSearched = artistName
    $scope.localConcerts = []

    apiService.getLocalConcerts(artistName, zip)
      .then(function (response) {
        if (response.data.length > 0) {
          $scope.localConcerts = response.data
        }
      }, function (err) {
        console.log(err)
      })
  }
})
