'use strict'

angular.module('liveTracker')
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({ redirectTo: '/' })

    // removes '#!' from url
    $locationProvider.html5Mode(true)
  }])
