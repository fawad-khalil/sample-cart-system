let redisClient = require('../libs/redisConnect');

let setKeyForever = (key, value) => {
	return redisClient.set(key, value);
}

let setKeyMortal = (key,value, lifeInSeconds) => {
	return redisClient.set(key, value, 'EX', lifeInSeconds);
}

let getValue = (key) => {
	return redisClient.get(key);
}

let deleteKey = (key) => {
	return redisClient.del(key);
}

module.exports = {
	setKeyForever: setKeyForever,
	setKeyMortal: setKeyMortal,
	getValue: getValue,
	deleteKey: deleteKey
}
