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
    $scope.scores = [[],[],[],[],[]];
    return $http.get('/games/Codefall/scores').success(function(data){
      for (var i = 0; i < data.length; i++) {
        $scope.scores[(data[i].level - 1)].push(data[i]);
      };
    });
    $scope.scores[0] = $scope.scores[0].sort(compare);
  })();
}]);

function compare(a,b) {
  if (a.score < b.score)
     return -1;
  if (a.score > b.score)
    return 1;
  return 0;
}
