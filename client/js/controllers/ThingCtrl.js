'use strict';

var app = angular.module('mean_template');

app.controller('ThingCtrl', function($scope) {
  $scope.test = 'This is a test of the thingCtrl scope.';
});
