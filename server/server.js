// call endpoint is: http://www.comicvine.com/api/characters/?api_key=_YOUR_KEY_&filter=name:_YOUR_SEARCH_&format=json
// var keys = require('./config');
// var comicvineKey == keys.vineKey;

var express = require('express');
var app = express();

// middleware
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

app.use(bodyParser.urlencoded({extended:true})); // data-parsing
app.use(bodyParser.json());
app.use(morgan('dev')); // logging

// serve static files (index.html)
app.use(express.static(path.join(__dirname, '../client')));



var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port 3000');
});