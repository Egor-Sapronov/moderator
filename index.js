'use strict';

var express = require('express');
var app = express();
var bodyparser = require('body-parser');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.get('/api/check', function(req, res) {
  res.send('check');
});


app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port ');
});
