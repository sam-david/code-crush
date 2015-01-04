var app = angular.module('codeCrush', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/partial-buttons.html'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  });

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html'
  });

  $stateProvider.state('game', {
    url: '/games/codefall',
    templateUrl: 'templates/codefall.html'
  });
});

app.controller('MainCtrl', function($scope){

});
