// Dependencies
var express = require('express');
var jade = require('pug');

var app = express();

// Attach compiled static resources (.styl > .css)
app.use(express.static(__dirname + '/static'));
// Attach truly static resources (images, javascript, etc)
app.use(express.static(__dirname + '/source/static'));

// Set up the pug template engine
app.set('views', __dirname + '/source/templates');
app.set('view engine', 'pug');

// Routing!
app.get('/', function(req, res, next) {
  try {
    res.render('pages/index', { title: 'Home' });
  } catch (e) {
    next(e);
  }
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});
