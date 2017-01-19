'use strict'

angular.module('mean_template')
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .when('/things', {
        templateUrl: 'views/things.html',
        controller: 'ThingCtrl'
      })

    $locationProvider.html5Mode(true)
  }])
