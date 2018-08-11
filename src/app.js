let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let colors = require('colors');

let const_resources = require('../res/res.json');
let routes = require('./routes/index');

//connect to mongodb
require('./libs/mongooseConnect')
//connect to redis
require('./libs/redisConnect')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

for (let key in routes) {
	let currentRoute = routes[key];
	app.use(const_resources.routes_prefix + currentRoute.prefix, currentRoute.route)
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

process.on('uncaughtException', function (error) {
	console.log('Error in app.js', error.stack);
});

module.exports = app;
