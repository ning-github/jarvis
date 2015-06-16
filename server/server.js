// to create an md5 hash for Marvel's serverside API use
var crypto = require('crypto');
// for getting API keys
var config = require('./config.js');
// for sending a get request
var request = require('request');

var express = require('express');
var app = express();

// server will need to handle search requests
app.post('/sentSearch', function(req, res){
  // collect the passed username 
  var str = '';
  req.on('data', function(chunk){
    str+=chunk;
  });
  req.on('end', function(){
    var heroName = str;
    // for timestamp needed in hash
    var ts = new Date().getTime();
    // the url for the api call
    var md5 = crypto.createHash('md5');
    var hash = md5.update(ts + config.private_key + config.public_key).digest('hex');
    // create the hashed url
    var apiUrl = 'http://gateway.marvel.com:80/v1/public/characters?name='+heroName+'&apikey='+config.public_key;
    apiUrl+='&ts='+ts+'&hash='+hash;
    // log apiUrl
    console.log('apiUrl: ', apiUrl);


    // send a GET request using that url
    // defaults to GET requests
    request(apiUrl, function(err, response, body){
      if (err){
        throw err;
      }
      console.log('finished body?: ', body);
      res.send(body);
    });
  })
});



var port = 3000;
var ip = "127.0.0.1";

// serve static files
app.use(express.static('../client'));

app.listen(port, function () {
  console.log("Listening on http://" + ip + ":" + port);
});