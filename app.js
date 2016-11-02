//Declare module
var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

//Routing
myNinjaApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/home',{
      templateUrl :'views/home.html',
      controller  : 'NinjaController'
    })
    .when('/directory',{
      templateUrl : 'views/directory.html',
      controller  : 'NinjaController'
    })
    .when('/contact',{
      templateUrl : 'views/contact.html',
      controller  : 'ContactController'
    })
    .when('/contact-success',{
      templateUrl : 'views/contact-success.html',
      controller  : 'ContactController'
    })
    .otherwise({
      redirectTo:'/home'
    });
}]);


//Declare controller NinjaController
myNinjaApp.controller('NinjaController', [ '$scope', '$http', function($scope, $http){
  $scope.message = "Hola desde controller";

  //console.log(angular.toJson($scope.ninjas));

  $scope.removeNinja = function(ninja){
    var removeNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removeNinja,1);
  };

  $scope.addNinja = function(){
    $scope.ninjas.push({
      name : $scope.newNinja.name,
      belt : $scope.newNinja.belt,
      rate : parseInt($scope.newNinja.rate),
      available:true
    });
    $scope.newNinja.name = "";
    $scope.newNinja.belt = "";
    $scope.newNinja.rate = "";
  };

 //Get datas from JSON file data/ninjas.json
  $http.get('data/ninjas.json').success(function(data){
    $scope.ninjas=data;
  });

  //Remove all ninjas function
  $scope.removeAll=function(){
    $scope.ninjas=[];
  }

}]); //end controller

//Declare controller NinjaController
myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
    $location.path('contact-success');
  };
}]);

//Declare Custome Directive
myNinjaApp.directive('randomNinja', [function(){
  return {
    restrict: 'E',
    scope: {
      ninjas:'=',
      title:'='
    },
    templateUrl:'views/random.html',
    transclude:true,
    controller:function($scope){
      $scope.random = Math.floor(Math.random() * 2);
    }
  };
}]);
