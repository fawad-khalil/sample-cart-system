var mongoose = require('mongoose');

var userSchema = require('../../user/model/schema');
var productSchema = require('../../product/model/schema');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
	user: {
		type: userSchema, 
		required: [true, 'Please enter the user identity.']
	},
	product: { 
		type: productSchema, 
		required: [true, 'Please enter the product identity to order.'] 
	},
	quantity: Number,
	shipping_address: String,
	order_date: Date,
	is_confirmed: { 
		type: Boolean, 
		required: [true, 'Please give the confirmation of order.'] 
	},
	is_shipped: Boolean,
	message: { type: String }

});

module.exports = orderSchema;