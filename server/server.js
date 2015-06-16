// to create an md5 hash for Marvel's serverside API use
var crypto = require('crypto');
// for getting API keys
var config = require('./config.js');

var express = require('express');

// server will need to handle request
// for timestamp needed in hash
var ts = new Date().getTime();
// the url for the api call
var md5 = crypto.createHash('md5');
var hash = md5.update(ts + config.private_key + config.public_key).digest('hex');
var apiUrl = 'http://gateway.marvel.com:80/v1/public/characters?name='+heroName+'&apikey='+config.public_key;
apiUrl+='&ts='+ts+'&hash='+hash;
// log apiUrl
console.log('apiUrl: ', apiUrl);


var app = express();
var port = 3000;
var ip = "127.0.0.1";

// serve static files
app.use(express.static('../client'));

app.listen(port, function () {
  console.log("Listening on http://" + ip + ":" + port);
});