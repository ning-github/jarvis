// to create an md5 hash for Marvel's serverside API use
var crypto = require('crypto');
// for getting API keys
var config = require('config.js');

angular.module('jarvis', ['ui.router'])

.factory('Heroes', function($http){
  var search = function(heroName){
    
  };
  return {
    search: search
  };
})
