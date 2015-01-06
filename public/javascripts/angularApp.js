var app = angular.module('codeCrush', ['ui.router']);
var user_id;

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

  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    resolve: {
      scores: function(scoreService){
        return scoreService.getScores();
      }
    }
  });

  $stateProvider.state('codefall', {
    url: '/games/codefall',
    templateUrl: 'templates/codefall.html'
  });
});

app.controller('UserCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
  $scope.getUser = function(){
    return $http.get('/currentuser').success(function(data){
      $scope.user = data;
      $window.user_id = data._id;
    });
  };
  $scope.getUser();
}]);

app.factory('scoreService', ['$http', function($http){
  return {
    getScores: function(){
      $http.get
    }
  }
}]);
