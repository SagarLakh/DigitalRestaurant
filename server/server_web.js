var express = require('express');
var app = express();
var path = require('path');






app.set('view engine', 'jade');
app.get('/', function(req, res) {
	res.sendFile(path.resolve('../web/release/index.html'));
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});