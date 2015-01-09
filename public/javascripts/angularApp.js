var app = angular.module('codeCrush', ['ui.router', 'ui.gravatar']);
var user_id;

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('error');
  $urlRouterProvider.when('','home');

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/partial-buttons.html'
  });


  $stateProvider.state('error', {
    url: '/error',
    templateUrl: 'templates/error.html'
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
    templateUrl: 'templates/profile.html'
  });

  $stateProvider.state('codefall', {
    url: '/games/codefall',
    templateUrl: 'templates/codefall.html'
  });

  $stateProvider.state('codeFallScores', {
    url: '/games/Codefall/scores',
    templateUrl: 'templates/hiscores.html'
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

app.controller('ScoreCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
  (function(){
    return $http.get('/currentuser').success(function(data){
      $scope.user = data;
      $window.user_id = data._id;
    });
  })();
}]);

app.controller('HiScoreCtrl', ['$scope', '$http', function($scope, $http){
  (function(){
    $http.get('/games/Codefall/scores/1').success(function(data){
      $scope.scores1 = data;
    });
    $http.get('/games/Codefall/scores/2').success(function(data){
      $scope.scores2 = data;
    });
    $http.get('/games/Codefall/scores/3').success(function(data){
      $scope.scores3 = data;
    });
    $http.get('/games/Codefall/scores/4').success(function(data){
      $scope.scores4 = data;
    });
    $http.get('/games/Codefall/scores/5').success(function(data){
      $scope.scores5 = data;
    });
  })();
}]);
