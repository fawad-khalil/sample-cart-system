var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	user_name: {
		type: String,
		unique: true,
		required: [true, 'Username is required.']
	},
	first_name: {
		type: String,
		required: [true, 'First Name is required.']
	},
	last_name: String,
	contact_number1: String,
	contact_number2: String,
	address: String,
	payment_method: String,
	payment_card: String,
	payment_card_holder_name: String,
	role: {
		type: String,
		required: [true, 'Role of user is required.'],
		enum: ['owner', 'manager', 'customer']
	}
});

module.exports = userSchema;