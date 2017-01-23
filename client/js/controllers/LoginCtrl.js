'use strict'

var app = angular.module('liveTracker')

app.controller('LoginCtrl', function ($scope, $window, $rootScope) {
  $scope.loginAndStoreZip = function (zip) {
    $window.location.href = '/auth/login'
  }
})
