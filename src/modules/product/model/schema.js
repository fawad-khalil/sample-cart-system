var mongoose = require('mongoose');
var productSubCategorySchema = require('../../productSubCategory/model/schema');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name of Product is required.']
	},
	purchase_date: {type: Date},
	purchase_price: {type: Number, required: [true, 'Product must have a price']},
	profit_prcentage: {type: Number, required: [true, 'Profit percentage is required.']},
	purchase_quantity: {type: Number, required: [true, 'Purchase Quantity of product is required.']},
	sub_category: {type: productSubCategorySchema, required: [true, 'Product Category is required.']},
	description: String,
	features: [String],
	pictures_path: {type: String, required: [true, 'Path of pictures of product is required.']}
});

module.exports = productSchema;