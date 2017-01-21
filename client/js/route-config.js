'use strict'

angular.module('liveTracker')
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })

    $locationProvider.html5Mode(true)
  }])
