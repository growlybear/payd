var payd = angular.module('payd', [
  'ui.router',
  'nvd3',
  'smart-table',
  'ui.bootstrap'
]);

payd.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('transactions', {
      url: '/transactions',
      templateUrl: 'templates/transactions.html'
    })
    .state('analyse', {
      url: '/analyse',
      templateUrl: 'templates/analyse.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html'
    });

});
