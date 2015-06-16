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
    $scope.newHero = ''; // clear search field

    // because the Marvel API is buggy regarding thumbnails, use if conditional
    if (done.data.results[0].thumbnail){
      $scope.pic = done.data.results[0].thumbnail.path + '.' + done.data.results[0].thumbnail.extension;  
    } else{
      $scope.pic='';
    }
    return Heroes.search(hero).then(function(done){
      return $scope.display = done.data.results[0].description;
    });
  };
});