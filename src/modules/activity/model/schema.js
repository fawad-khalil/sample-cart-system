var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = require('../../user/model/schema');

var activitySchema = new Schema({
	method: {type: String, required: [true, 'Please provide the activity method.']},
	user: {type: userSchema, require: [true, 'Please provide info of user performing activity.']},
	time: {type: Date},
	model: {type: String}

});

module.exports = activitySchema;