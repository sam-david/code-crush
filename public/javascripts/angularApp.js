var app = angular.module('codecrush', ['ui.router']);

app.controller("LoginCtrl",['$scope','$http', function($scope,$http) {
  var user = {
    email: $scope.email,
    password: $scope.password
  }
  $scope.test = user;
  $scope.addUser = function(user) {
    $http.post('/users', user).success(function(data) {
    });
  }
}])

app.controller("UserCtrl",['$scope','$http', function($scope,$http) {
  $scope.users = [];
  $http.get('/users').success(function(data) {
    $scope.users = data;
  });
  $scope.addUser = function(){
    var user = {
    email: $scope.email,
    password: $scope.password
    };
    $http.post('/users', user).success(function(data) {
      $scope.users.push(user);
    });

    $scope.email = '';
    $scope.password = '';
  };


}])
