/**
 * Module dependencies.
 */
var express = require('express'),
	path = require('path'),
	config = require('./config')('local'),
	routes = require('./config/routes'),
	app = express(),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
 	session= require('express-session');
	//cookieSession = require('cookie-session');

// Setup a global var for this apps config
global.wnp = global.wnp || {};
global.wnp.config = global.wnp.config || require('./package.json').config;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('layout', 'layout')
app.engine('html', require('hogan-express'));
app.use(cookieParser());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));
//app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }));
app.use(require('less-middleware')( __dirname + '/public' ));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

var server = app.listen(config.port, function() {
  	console.log(
  		'\nExpress server listening on port ' + config.port
  	);
});
