/**
 * Module dependencies.
 */
var express = require('express'),
	path = require('path'),
	config = require('./config')(),
	routes = require('./config/routes'),
	app = express(),
	cookieParser = require('cookie-parser');

// Setup a global var for this apps config
global.wnp = global.wnp || {};
global.wnp.config = global.wnp.config || require('./package.json').config;

app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('layout', 'layout')
app.engine('html', require('hogan-express'));
app.use(cookieParser());
app.use(require('less-middleware')( __dirname + '/public' ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models/stubs')));

routes(app);

var server = app.listen(config.port, function() {
  	console.log(
  		'\nExpress server listening on port ' + config.port
  	);
});
