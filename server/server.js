var express = require('express');

var app = express();
var port = 3000;
var ip = "127.0.0.1";

// serve static files
app.use(express.static('../client'));

app.listen(port, function () {
  console.log("Listening on http://" + ip + ":" + port);
});