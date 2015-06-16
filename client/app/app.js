// to create an md5 hash for Marvel's serverside API use
var crypto = require('crypto');
// for getting API keys
var config = require('config.js');

angular.module('jarvis', ['ui.router'])

.factory('Heroes', function($http){
  var search = function(heroName){
    // for timestamp needed in hash
    var ts = newDate.getTime();
    // the url for the api call
    var md5 = crypto.createHash('md5');
    var hash = md5.update(ts + config.private_key + config.public_key).digest('hex');
    var apiUrl = 'http://gateway.marvel.com:80/v1/public/characters?name='+heroName+'&apikey='+config.public_key;
    apiUrl+='&ts='+ts+'&hash='+hash;
    // log apiUrl
    console.log('apiUrl: ', apiUrl);
    return $http({
      method: 'GET',
      url: apiUrl
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
