angular.module('MainApp')
  .controller('DisplayRunCtrl', function ($scope, run) {
    $scope.displayedRun = run;
  });