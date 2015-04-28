angular.module('MainApp', ['firebase', 'ui.router', 'ui.bootstrap'])
  .config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('upcoming', {
        url: '/upcoming',
        templateUrl: 'views/upcoming.html'
      })
      .state('upcoming.run', {
        url: 'runs/:id',
        templateUrl: 'views/run.fragment.html',
        controller: function ($scope, run) {
          $scope.displayedRun = run;
          $scope.title = false;
        },
        resolve: {
          run: function ($stateParams, RunService) {
            // return $firebase(new Firebase("https://snowsnorkelers.firebaseio.com/events/" + $stateParams.id)).$asObject();
            return RunService.lookupById($stateParams.id);
          }
        }
      })
      .state('past', {
        url: '/past',
        templateUrl: 'views/past.html'
      })
      .state('past.run', {
        url: 'runs/:id',
        templateUrl: 'views/run.fragment.html',
        controller: function ($scope, run) {
          $scope.displayedRun = run;
          $scope.title = false;
        },
        resolve: {
          run: function ($stateParams, RunService) {
            // return $firebase(new Firebase("https://snowsnorkelers.firebaseio.com/events/" + $stateParams.id)).$asObject();
            return RunService.lookupById($stateParams.id);
          }
        }
      })
      .state('nextRun', {
        url: '/',
        templateUrl: 'views/nextRun.html'
      });
  });
