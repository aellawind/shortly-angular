var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  // app.set('views', __dirname + '/public/client/templates');
  // app.engine('html', require('ejs').renderFile);
  // app.set('view engine', 'html');
  // app.use(partials());
  app.use(express.bodyParser());
  // app.use(express.static(__dirname + '/bower_components'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
  app.use(app.router);
});

// app.get('/', util.checkUser, handler.renderIndex);
// app.get('/create', util.checkUser, handler.renderIndex);
// app.get('/links', util.checkUser, handler.fetchLinks);

app.get('/', function(req, res) {
  res.sendfile(__dirname+'/public/client/templates/index.html');
});
//app.get('/create', handler.renderIndex);
app.get('/links', handler.fetchLinks);
app.post('/links', handler.saveLink);
// app.get('/login', handler.loginUserForm);
// app.post('/login', handler.loginUser);
// app.get('/logout', handler.logoutUser);

// app.get('/signup', handler.signupUserForm);
// app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
