angular.module('jarvis', ['ui.router'])

.factory('Heroes', function($http){
  var search = function(heroName){
    return $http({
      method: 'POST',
      url: '/sentSearch',
      data: heroName
    }).then(function(res){
      // log response data
      console.log('description: ', res.data.data.results[0].description);
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
    return Heroes.search(hero).then(function(done){
      return $scope.display = done.data.results[0].description;
    });
  };
});