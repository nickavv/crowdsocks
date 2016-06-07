// Dependencies
var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var jade = require('pug');

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

app.get('/start-game/:gameid', function(req, res, next) {
    try {
      var responseObject = {
        roomId: generateCode(),
        gameId: req.params.gameid
      }
      res.send(responseObject);
    } catch (e) {
      next(e);
    }
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000));
});

function generateCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
