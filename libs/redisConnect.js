let redis = require('redis');

let colors = require('colors');
let redisHostAddress = require('../res/config.json').redis_host;
let redisPort = require('../res/config.json').redis_port;
let redisConnectedMessage = require('../res/res.json').redis_connect_success;
let redisErrorMessage = require('../res/res.json').redis_error;
let redisMonitorModeOn = require('../res/res.json').redis_monitor_mode_on;

let redisClient = redis.createClient(redisPort, redisHostAddress);

redisClient.monitor(function (err, res) {
	console.log(redisMonitorModeOn.green);
});

redisClient.on('connect', function () {
	console.log((redisConnectedMessage + redisHostAddress + ':' + redisPort).green);
});

redisClient.on('error', function (error) {
	console.log((redisErrorMessage + redisHostAddress + ':' + redisPort).red, error);
});

redisClient.on('monitor', function (time, args, raw_reply) {
	console.log('Request to redis' + ': ' + time + ': ' + args); // 1458910076.446514:['set', 'foo', 'bar']
});

module.exports = redisClient;