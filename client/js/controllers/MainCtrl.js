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

  $scope.addZip = function (id, zipToAdd) {
    apiService.addZipCodeToUser(id, zipToAdd)
      .then(function (response) {
        $scope.currentUser = response.data
      }, function (err) {
        console.log(err)
      }
    )
  }

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
