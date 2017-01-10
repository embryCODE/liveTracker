'use strict';

var app = angular.module('mean_template');

app.controller('MainCtrl', function($scope) {
  $scope.test = "This is a test of the mainCtrl scope.";
});
