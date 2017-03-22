// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig = require('swig');
var routes = require('./app/routes');
var express = require('express');
var app = express();
var Server = require('http').Server;
var PORT = process.env.PORT || 8080;
const server = Server(app);

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found');
    }
  });
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('messageSent', function (d) {
    io.emit('messageFetch', {});
  });
});

// start listening to requests on port 8080
server.listen(PORT, function () {
  console.log('Listening on port 8080');
});

server.on ( 'uncaughtException', function () {
  //Close connection
  server.close();
});

// On kill
server.on('SIGTERM', function() {
  server.close();
});

//On exit
server.on('exit', function() {
  server.close();
});