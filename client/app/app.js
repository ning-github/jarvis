angular.module('jarvis', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('heroes', {
      url: '/heroes',
      // NOTE this template path is relative from index.html
      templateUrl: '/app/partials/heroes.html'
    })
})

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
    return Heroes.search(hero).then(function(done){
      // because the Marvel API is buggy regarding thumbnails, use if conditional
      if (done.data.results[0].thumbnail){
        $scope.pic = done.data.results[0].thumbnail.path + '.' + done.data.results[0].thumbnail.extension;  
      } else{
        console.log('re-getting so can try to obtain thumbnail');
        $scope.search(hero);
      }
      return $scope.display = done.data.results[0].description;
    });
  };
});