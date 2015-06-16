angular.module('jarvis', ['ui.router'])

.factory('Heroes', function($http){
  // var baseUrl = 'http://gateway.marvel.com/v1/';
  // var pubKey = 'd19899c0338496f8923aef29a9576417';
  var search = function(heroName){
    return $http({
      method: 'POST',
      //method: 'GET',
      //url: baseUrl+'public/characters?name='+heroName+'&apikey='+pubKey,
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
  $scope.desc = function(hero){
    $scope.newHero = '';
    return Heroes.search(hero).then(function(done){
      if (done.data.results[0].thumbnail){
        $scope.pic = done.data.results[0].thumbnail.path + '.' + done.data.results[0].thumbnail.extension;  
      }
      else{
        $scope.pic='';
      }
      //$scope.pic = done.data.results[0].thumbnail.path + '.' + done.data.results[0].thumbnail.extension;
      return $scope.display = done.data.results[0].description;
    });
  };
});