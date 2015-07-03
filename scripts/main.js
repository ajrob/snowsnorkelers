angular.module('MainApp', ['firebase', 'ui.router', 'ui.bootstrap'])
  .config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('upcoming', {
        url: '/upcoming-runs',
        templateUrl: 'views/upcoming.html'
      })
      .state('past', {
        url: '/past-runs',
        templateUrl: 'views/past.html'
      })
      .state('nextRun', {
        url: '/',
        templateUrl: 'views/nextRun.html'
      });
  });
