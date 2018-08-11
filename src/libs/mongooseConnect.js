let mongoose = require('mongoose');

let config = require('../../res/config.json');
let resources = require('../../res/res.json');

//connect to mongoose
let dbLink = config.mongodb_server + config.electronics_panga_db

let mongoConnect = mongoose.connect(dbLink)

mongoConnect.then(function (connection) {
	console.log((resources.mongo_connect_success + dbLink + '!').green);
}).catch(function (error) {
	console.log((resources.mongo_connect_fail + dbLink + '!').red, error);
});