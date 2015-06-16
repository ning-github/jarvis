angular.module('jarvis', ['ui.router'])

.factory('Heroes', function($http){
  var search = function(heroName){
    return $http({
      method: 'GET',
      url: 
    }).then(function(res){
      // log response data
      console.log('response data: ', res.data);
      return res.data;
    });
  };
  return {
    search: search
  };
})

.controller('HeroesController', function($scope, Heroes){
  $scope.display = '';  // clear display before redisplaying
  $scope.search = function(hero){
    $scope.display = Heroes.search(hero);
  };
});