angular.module('jarvis', ['ui.router'])

.factory('Heroes', function($http){
  var search = function(heroName){
    return $http({
      method: 'POST',
      url: '/sentSearch',
      data: heroName
    }).then(function(res){
      // log response data
      console.log('all the data!: ', res.data);
      console.log('description: ', res.data.data.results[0].description);
      return res.data;
    });
  };
  return {
    search: search
  };
})

.controller('HeroesController', function($scope, Heroes){
  $scope.pic = '';
  $scope.display = '';  // clear display before redisplaying
  $scope.search = function(hero){
    return Heroes.search(hero).then(function(done){
      // if the entered hero was found
      if (done) {
        $scope.pic = done.data.results[0].thumbnail.path+'.'+done.data.results[0].thumbnail.extension;
        return $scope.display = done.data.results[0].description;
      }
    });
  };
});