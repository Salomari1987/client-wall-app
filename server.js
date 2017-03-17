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
var swig  = require('swig');
var routes = require('./app/routes');
var express = require('express');
var app = express();

var PORT = process.env.PORT || 8080;

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

// start listening to requests on port 8080
app.listen(PORT, function () {
	console.log("Listening on port 8080")
});

app.on ( 'uncaughtException', function () {
	//Close connection
	server.close();
});

// On kill
app.on('SIGTERM', function() {
	server.close();
});

//On exit
app.on('exit', function() {
	server.close();
});