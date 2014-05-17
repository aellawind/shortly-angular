
var app = angular.module('shortlyApp', ['ngRoute']);


app.controller('linkArea', function($scope, $http) {
  $http.get('/links')
    .success(function(data,status,headers,config) {
      console.log(data[0]);
      data.sort
      $scope.links = data; //REMEMBER TO REFORMAT
    });

  $scope.navigate = function(link1) {
    var a = '/'+link1;
    $http.get(a);
    console.log('link', a);
    // $http.get(link.code)
    //     .success(function(data) {

    //     });
  };
});

app.controller('shorten', function($scope, $http) {

  $scope.submit = function() {
    var url = $scope.url;
    var data = JSON.stringify({ url: url });
    console.log($scope.url, data);
    $http.post('/links', data)
      .success(function(data) {
        console.log('success');
        console.log(data);
      })
      .error(function(err) {
        console.log('error');
        console.log(data.url);
        console.log(err);
      });
  };

});


app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl : '/client/templates/home.html',
      controller : 'linkArea'
    })
    .when('/shorten', {
      templateUrl : '/client/templates/shorten.html',
      controller : 'shorten'
    });
});
